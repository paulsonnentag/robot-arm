var Firebase = require('firebase');
var es = require('event-stream');

function actionQueue(url) {

  var actionsRef = new Firebase(url);

  var queue = es.through(function (instruction) {

    es.readArray(instruction.actions)
      .pipe(es.through(function (action) {

        queue.emit('data', action);

      }, function () {

        actionsRef.child(instruction.id).remove();

      }));
  });

  actionsRef.on('child_added', function (action) {
    queue.write({
      id: action.name(),
      actions: action.val()
    });
  });

  return queue.pipe(es.pause());
}

module.exports = actionQueue;

