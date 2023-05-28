const Repository = require("../models/Repository.js");
// eslint-disable-next-line no-unused-vars
const pagination = require("mongoose-pagination");
const {
  validateRepository,
  validateChangeStatus,
} = require("../helpers/validation.js");

//create a new Repository
const create = async (req, res) => {
  let identifiedUser = req.user;
  let repositoryData = req.body;

  //validate comment data
  let isValidRepository = validateRepository(repositoryData);
  if (!isValidRepository) {
    return res.send({
      status: "error",
      message: "Invalid comment",
    });
  }

  repositoryData.user = identifiedUser.id;

  let repository = new Repository(repositoryData);
  repository
    .save()
    .then(() => {
      return res.send({
        status: "success",
        message: "repository saved successfully",
      });
    })
    .catch(() => {
      return res.send({
        status: "error",
        message: "couldn't save repository",
      });
    });
};

//sort repositories by their date, first the most recently uploaded
const listByDate = (req, res) => {
  //set page
  let page = req.params.page ? req.params.page : 1;

  //get tags from body to search realted repositories
  let tags = req.body.tags;

  //set items per page
  let itemsPerPage = 5;

  //find, sort and paginate repositories
  if (!tags) {
    Repository.find({
      status: "aprobado",
    })
      .select({
        _id: false,
        status: false,
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count()
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  } else {
    Repository.find({
      tags: { $in: tags },
      status: "aprobado",
    })
      .select({
        _id: false,
        status: false,
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count()
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  }
};

//sort repositories by their name
const listByName = (req, res) => {
  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //get tags from body to search realted repositories
  let tags = req.body.tags;

  //find, sort and paginate repositories
  if (!tags) {
    Repository.find({
      status: "aprobado",
    })
      .select({
        _id: false,
        status: false,
      })
      .sort({ title: "desc" })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count()
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  } else {
    Repository.find({
      tags: { $in: tags },
      status: "aprobado",
    })
      .select({
        _id: false,
        status: false,
      })
      .sort({ title: "desc" })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count()
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  }
};

//sort repositories by their rate
const listByRate = (req, res) => {
  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //get tags from body to search realted repositories
  let tags = req.body.tags;

  //find, sort and paginate repositories
  if (!tags) {
    Repository.find({
      status: "aprobado",
    })
      .select({
        _id: false,
        status: false,
      })
      .sort({
        average_rating: "desc",
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count()
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  } else {
    Repository.find({
      tags: { $in: tags },
      status: "aprobado",
    })
      .select({
        _id: false,
        status: false,
      })
      .sort({
        average_rating: "desc",
      })
      .populate({
        path: "user",
        select: "nick image",
      })
      .paginate(page, itemsPerPage)
      .then((repositories) => {
        if (!repositories) {
          return res.status(404).send({
            status: "error",
            message: "no repositories found",
          });
        }

        //count documents and send response
        Repository.count()
          .then((total) => {
            return res.status(200).send({
              status: "success",
              page,
              itemsPerPage,
              total,
              pages: Math.ceil(total / itemsPerPage),
              repositories,
            });
          })
          .catch(() => {
            return res.status(500).send({
              status: "error",
              message: "Error while counting repositories",
            });
          });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "couldn't find any repository",
        });
      });
  }
};

//list on revision repositories (only for admins)
const listPendingOnes = (req, res) => {
  //check if the user is an admin
  if (!req.user.role !== "admin") {
    return res.send({
      status: "error",
      message: "You are not allowed",
    });
  }

  //set page
  let page = req.params.page ? req.params.page : 1;

  //set items per page
  let itemsPerPage = 5;

  //find, sort and paginate repositories
  Repository.find({
    status: "en revisión",
  })
    .select({
      _id: false,
      status: false,
    })
    .populate({
      path: "user",
      select: "nick image",
    })
    .paginate(page, itemsPerPage)
    .then((repositories) => {
      if (!repositories) {
        return res.status(404).send({
          status: "error",
          message: "no repositories found",
        });
      }

      //count documents and send response
      Repository.count()
        .then((total) => {
          return res.status(200).send({
            status: "success",
            page,
            itemsPerPage,
            total,
            pages: Math.ceil(total / itemsPerPage),
            repositories,
          });
        })
        .catch(() => {
          return res.status(500).send({
            status: "error",
            message: "Error while counting repositories",
          });
        });
    })
    .catch(() => {
      return res.status(500).send({
        status: "error",
        message: "couldn't find any repository",
      });
    });
};

//approve a repository or not (only for admins)
const changeState = async (req, res) => {
  console.log(req.user.role);
  if (req.user.role !== "admin") {
    return res.send({
      status: "error",
      message: "You are not allowed",
    });
  }

  let status = req.body.status;
  let isValidStatus = validateChangeStatus(status);
  if (!isValidStatus) {
    return res.send({
      status: "error",
      message: "el estado debe ser 'aprobado' o 'denegado'",
    });
  }

  try {
    await Repository.findByIdAndUpdate(
      { _id: req.body.repository },
      { status: req.body.status }
    );
  } catch {
    return res.send({
      status: "error",
      message: "error updating repository",
    });
  }

  return res.send({
    status: "success",
    message: "el estado se cambió exitosamente a: " + req.body.status,
  });
};

module.exports = {
  create,
  listByDate,
  listByName,
  listByRate,
  listPendingOnes,
  changeState,
};
