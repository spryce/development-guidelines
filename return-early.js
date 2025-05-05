// Comments from Confluence:
// This is a real-world example of refactoring to remove nesting, reduce code complexity, and enhance readability and maintainability
// The basic principle is a shift in mindset. Rather than checking if a condition is true and then performing some work or returning, 
// you should instead check if it is false and exit the function as early as possible.
// ================================================================================================

/**
 * Original function
 * 1178 Chars
 * 8 Levels of indentation!!!!
 * Hard to read and maintain
 * - if, then. else, if, then else etc
 */
function loadChatOriginal() {
    if ($stateParams.type && $stateParams.conversationId) { // note: <--if true, do something
        if ($scope.$parent.activeTopic && !_.isEmpty($scope.$parent.activeTopic)) { // note: <--if true, do something
            bindConversation();
        }
        else {
            if ($scope.isConvLoaded) { // note: <--if true, do something
                let topic = {}; 
                if ($stateParams.type == "direct") { // note: <-- if true, do something
                    topic = $scope.directMessages.filter(direct=> {
                        return direct.conversationId == $stateParams.conversationId;
                    });
                } else if ($stateParams.type == "channel") { 
                    topic = $scope.channelsTopic.filter(channel=> {
                        return channel.name == $stateParams.conversationId;
                    });
                }
                if (topic.length > 0) {
                    $scope.$parent.activeTopic = topic[0];
                    bindConversation();
                } else {
                    $state.go('messenger');
                }
            }
            else {
                setTimeout(function () {
                    loadChat();
                }, 100);
            }
        }
    }
    else {
        $state.go('messenger');
    }
  }
  /**
   * The same function, refactored
   * 828 Chars - 350 less chars than before, 30% less code to read.
   * Only 1 level of indentation!!
   * Easy to read and maintain
   */
  function loadChatRefactored() {
    if (!($stateParams.type && $stateParams.conversationId)) { // <-- If falsy, leave!
      $state.go('messenger');
      return;
    }
    if ($scope.$parent.activeTopic && !_.isEmpty($scope.$parent.activeTopic)) { // Another opportunity to leave
      bindConversation();
      return;
    }
    if (!$scope.isConvLoaded) { // Another opportunity to leave
      setTimeout(function () {
        loadChat();
      }, 100);
      return;
    }

    let topic = {};
    if ($stateParams.type == "direct") {
      topic = $scope.directMessages.filter(direct => direct.conversationId == $stateParams.conversationId);
    }
    if ($stateParams.type == "channel") {
      topic = $scope.channelsTopic.filter(channel => channel.name == $stateParams.conversationId);
    }
    if (!topic.length > 0) {
      $state.go('messenger');
      return;
    }
    $scope.$parent.activeTopic = topic[0];
    bindConversation();
  }