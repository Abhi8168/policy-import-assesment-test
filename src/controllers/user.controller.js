const Policy = require("../models/policy.model");
const User = require("../models/user.model");
const constants = require("../constants");
// Aggregate total policies by user
exports.aggregatePoliciesByUser = async (req, res) => {
  try {
    const aggregationPipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $group: {
          _id: "$userId",
          username: { $first: "$userDetails.firstName" },
          email: { $first: "$userDetails.email" },
          totalPolicies: { $sum: 1 },
        },
      },
      { $sort: { totalPolicies: -1 } },
    ];

    const result = await Policy.aggregate(aggregationPipeline);
    const totalCount = result.length; // Total groups after aggregation

    res.status(constants.HttpStatus.OK).json({
      success: true,
      totalCount,
      data: result,
    });
  } catch (err) {
    res.status(constants.HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: constants.Messages.INTERNAL_ERROR,
    });
  }
};

// Search Policies by Username
exports.searchPolicyByUser = async (req, res) => {
  try {
    const username = req.params.username;

    const result = await User.aggregate([
      {
        $match: {
          firstName: { $regex: username, $options: "i" },
        },
      },
      {
        $lookup: {
          from: "policies",
          localField: "_id",
          foreignField: "userId",
          as: "policies",
        },
      },
      { $unwind: { path: "$policies", preserveNullAndEmptyArrays: true } },

      // Populate category
      {
        $lookup: {
          from: "policycategories",
          localField: "policies.categoryId",
          foreignField: "_id",
          as: "policies.category",
        },
      },
      {
        $unwind: {
          path: "$policies.category",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Populate carrier
      {
        $lookup: {
          from: "policycarriers",
          localField: "policies.companyId",
          foreignField: "_id",
          as: "policies.carrier",
        },
      },
      {
        $unwind: {
          path: "$policies.carrier",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Populate account
      {
        $lookup: {
          from: "accounts",
          localField: "policies.accountId",
          foreignField: "_id",
          as: "policies.account",
        },
      },
      {
        $unwind: {
          path: "$policies.account",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Reshape policy fields
      {
        $project: {
          _id: 1,
          firstName: 1,
          email: 1,
          policy: {
            $cond: {
              if: {
                $and: [
                  { $ne: ["$policies", null] },
                  { $ne: ["$policies.policyNumber", null] },
                  { $ne: [{ $objectToArray: "$policies" }, []] },
                ],
              },
              then: {
                policyNumber: "$policies.policyNumber",
                policyStartDate: "$policies.policyStartDate",
                policyEndDate: "$policies.policyEndDate",
                accountName: "$policies.account.accountName",
                companyName: "$policies.carrier.companyName",
                categoryName: "$policies.category.categoryName",
              },
              else: "$$REMOVE",
            },
          },
        },
      },

      // Group back policies under the user
      {
        $group: {
          _id: "$_id",
          firstName: { $first: "$firstName" },
          email: { $first: "$email" },
          policies: { $push: "$policy" },
        },
      },
      {
        $addFields: {
          policyCount: { $size: "$policies" },
        },
      },
    ]);

    res.status(constants.HttpStatus.OK).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(constants.HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: constants.Messages.INTERNAL_ERROR,
    });
  }
};
