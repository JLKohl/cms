const Sequence = require('../models/sequences');

let sequenceId;
let maxDocumentId;
let maxMessageId;
let maxContactId;

function SequenceGenerator() {

  Sequence.findOne()
    .then(sequence => {
      if (!sequence) {
        console.log('No sequence document found in DB');
        return;
      }

      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    })
    .catch(err => {
      console.log('Error loading sequence:', err);
    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {

  let updateObject = {};
  let nextId;

  switch (collectionType) {

    case 'documents':
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;

    case 'messages':
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;

    case 'contacts':
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;

    default:
      return -1;
  }

  // update DB safely (modern Mongoose)
  Sequence.updateOne(
    { _id: sequenceId },
    { $set: updateObject }
  )
    .then(() => {
      // updated successfully
    })
    .catch(err => {
      console.log('nextId update error:', err);
    });

  return nextId;
};

module.exports = new SequenceGenerator();