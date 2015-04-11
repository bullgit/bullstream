 
"use strict";

var $pageTitle="Rocket-Design";
var $pageSubtitle="want to chat ?";

var baseDev = 'https://rocket-design-dev.firebaseio.com/';
var baseProd = 'https://torrid-torch-4942.firebaseio.com/';
var base = baseProd


var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * Build up Firebase references
 */
 var _fbBase = new Firebase(base);
 var _fbMessages = _fbBase.child("messages");
 var _fbUsers = _fbBase.child("users");

/**
 * Local cache of users in a Map
 * Used to track who is here.
 */
 var _users = new Map();

/**
 * mardown-it instance to parse chat messages
 */
 var _md = window.markdownit({
  linkify: true });

/**
 * Message Component
 * Renders an individual message or event in the list
 */
 var Message = (function (_React$Component) {
  function Message() {
    _classCallCheck(this, Message);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Message, _React$Component);

  _prototypeProperties(Message, null, {
    render: {
      value: function render() {
        /*
         * Run message through markdown-it.
         * dangerouslySetInnerHTML is necessary b/c React escapes HTML by defaukt
         */
         var messageText = React.createElement("div", { dangerouslySetInnerHTML: { __html: _md.render(this.props.message.text) } });

        /**
         * Event messages
         * User has joined/left room
         */
         if (this.props.message.type === "event") {
          // Buggy, removing for now.
          return null;

          // return <div className="message message-event">
          //   {messageText}
          // </div>;
        }

        return React.createElement(
          "div",
          { className: "message" },
          React.createElement(
            "div",
            {className:"image-container"}, 
            React.createElement("img", { className: "animated fadeIn rounded", width: "48", height: "48", src: this.props.message.user_avatar })
            ),
          React.createElement(
            "div",
            { className: "message-text animated lightSpeedIn" },
            React.createElement(
              "div",
              { className: "message-username" },
              React.createElement(
                "a",
                { target: "_blank", href: "https://twitter.com/" + this.props.message.username },
                "@" + this.props.message.username
                ),
              " ",
              React.createElement(
                "span",
                { className: "message-time" },
                moment(this.props.message.timestamp).format("h:mma")
                )
              ),
            messageText
            )
          );
},
writable: true,
configurable: true
}
});

 return Message;
})(React.Component);

/**
 * MessageList Component
 * Renders the list of chat messages
 */
 var MessageList = (function (_React$Component2) {
  function MessageList() {
    _classCallCheck(this, MessageList);

    if (_React$Component2 != null) {
      _React$Component2.apply(this, arguments);
    }
  }

  _inherits(MessageList, _React$Component2);

  _prototypeProperties(MessageList, null, {
    componentDidUpdate: {
      /**
       * Anytime new data comes in, scroll to bottom
       * TODO: Could be more intelligent here and only
       * scroll when user is not browsing back up the list.
       */
       value: function componentDidUpdate() {
        var list = this.refs.messageList.getDOMNode();
        list.scrollTop = list.scrollHeight;
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;
        return React.createElement(
          "div",
          { ref: "messageList", className: "message-list" },
          this.props.messages.map(function (message) {
            return React.createElement(Message, {
              message: message,
              currentUser: message.userID === _this.props.currentUserId });
          })
          );
      },
      writable: true,
      configurable: true
    }
  });

  return MessageList;
})(React.Component);

var UserList = (function (_React$Component3) {
  function UserList() {
    _classCallCheck(this, UserList);

    if (_React$Component3 != null) {
      _React$Component3.apply(this, arguments);
    }
  }

  _inherits(UserList, _React$Component3);

  _prototypeProperties(UserList, null, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "user-list-container" },
          React.createElement(
            "h2",
            null,
            this.props.users.length ? this.props.users.length : "No",
            " user",
            this.props.users.length !== 1 ? "s" : "",
            " chatting"
            ),
          React.createElement(
            "div",
            { className: "user-list" },
            this.props.users.map(function (user) {
              return React.createElement(UserListItem, { user: user });
            })
            )
          );
      },
      writable: true,
      configurable: true
    }
  });

  return UserList;
})(React.Component);

var UserListItem = (function (_React$Component4) {
  function UserListItem() {
    _classCallCheck(this, UserListItem);

    if (_React$Component4 != null) {
      _React$Component4.apply(this, arguments);
    }
  }

  _inherits(UserListItem, _React$Component4);

  _prototypeProperties(UserListItem, null, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "user-list-item" },
          React.createElement("img", 
            {className: "animated rollIn rounded", width: "24", height: "24", src: this.props.user.twitter.cachedUserProfile.profile_image_url_https }
            ),

          this.props.user._isCurrentUser ? "You" : "@" + this.props.user.twitter.username
          );
      },
      writable: true,
      configurable: true
    }
  });

  return UserListItem;
})(React.Component);

/**
 * MessageForm Component
 * Form input for adding new messages
 */
 var MessageForm = (function (_React$Component5) {
  function MessageForm() {
    _classCallCheck(this, MessageForm);

    if (_React$Component5 != null) {
      _React$Component5.apply(this, arguments);
    }
  }

  _inherits(MessageForm, _React$Component5);

  _prototypeProperties(MessageForm, null, {
    componentDidMount: {
      value: function componentDidMount() {
        this.refs.messageText.getDOMNode().focus();
      },
      writable: true,
      configurable: true
    },
    _onSubmit: {

      /**
       * Submit the new Message
       * @param {object} event - onsubmit event
       */
       value: function _onSubmit(event) {
        event.preventDefault();

        var user = _users.get(this.props.userId);
        var message = this.refs.messageText.getDOMNode().value.trim();

        if (!message.length) {
          return;
        }

        _fbMessages.push({
          type: "userMessage",
          user_avatar: user.twitter.cachedUserProfile.profile_image_url_https,
          username: user.twitter.username,
          text: this.refs.messageText.getDOMNode().value,
          timestamp: +new Date() });

        event.target.reset();
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "form",
          { onSubmit: this._onSubmit.bind(this), className: "message-form" },
          React.createElement("input", { className: "form__input",ref: "messageText", type: "text", placeholder: "Type your message here, markdown accepted" })
          );
      },
      writable: true,
      configurable: true
    }
  });

 return MessageForm;
})(React.Component);

/**
 * RegisterForm Component
 * Renders the registration form when a user enters the chat window
 */
 var RegisterForm = (function (_React$Component6) {
  function RegisterForm() {
    _classCallCheck(this, RegisterForm);

    if (_React$Component6 != null) {
      _React$Component6.apply(this, arguments);
    }
  }

  _inherits(RegisterForm, _React$Component6);

  _prototypeProperties(RegisterForm, null, {
    render: {
      value: function render() {
        return React.createElement(
          "form",
          { onSubmit: this.props.onSubmit },
          React.createElement(
            "button",
            { type: "submit" },
            "Login with Twitter"
            )
          );
      },
      writable: true,
      configurable: true
    }
  });

  return RegisterForm;
})(React.Component);

/**
 * Application Component
 * Main component
 */
 var Application = (function (_React$Component7) {
  function Application() {
    _classCallCheck(this, Application);

    this._messages = [];
    this._username = null;

    this.state = {
      messages: [],
      user: null,
      users: [],
      userId: null,
      joinError: null };

      if (location.href.indexOf("fullpage") !== -1) {
        this.state.joinError = "View this pen in the Editor in order to join the chat. Codepen's fullpage view blocks popups, so Twitter authentication does not work.";
      }

      this._join = this._join.bind(this);
      this._createUsersArray = this._createUsersArray.bind(this);
    }

    _inherits(Application, _React$Component7);

    _prototypeProperties(Application, null, {
      componentWillMount: {
        value: function componentWillMount() {
          var _this = this;
        /**
         * onAuth fires anytime the auth status of this user changes
         */
         _fbBase.onAuth(function (authData) {
          if (!authData) {
            return;
          }

          _this._username = authData.twitter.username;

          _fbUsers.push(authData);

          _this.setState({
            user: _this._username,
            joinError: null });
        });

        /**
         * Faster to call once.value, then listen to 
         * new children after that
         */
         _fbMessages.once("value", function (dataSnapshot) {
          dataSnapshot.forEach(function (snapshot) {
            _this._messages.push(snapshot.val());
          });

          _this.setState({ messages: _this._messages });

          var last = _this._messages[_this._messages.length - 1];

          _fbMessages.orderByChild("timestamp").startAt(last.timestamp + 1).on("child_added", function (snapshot) {
            _this._messages.push(snapshot.val());
            _this.setState({ messages: _this._messages });
          });
        });

         _fbUsers.on("child_added", function (snapshot) {
          var key = snapshot.key();
          var userObj = snapshot.val();

          _users.set(key, snapshot.val());

          _this._createUsersArray();

          if (userObj.twitter.username === _this._username) {
            _this.setState({ userId: key });

            var disconnectListener = _fbUsers.child(key);
            disconnectListener.onDisconnect().remove();
          }
        });

         _fbUsers.on("child_removed", function (snapshot) {
          _users["delete"](snapshot.key());

          _this._createUsersArray();
        });
       },
       writable: true,
       configurable: true
     },
     _createUsersArray: {
      value: function _createUsersArray() {
        var _this = this;
        var users = [];

        _users.forEach(function (user, key) {
          user._isCurrentUser = user.twitter.username === _this._username;
          users.push(user);
        });

        this.setState({ users: users });
      },
      writable: true,
      configurable: true
    },
    _join: {

      /**
       * Add the user to the chat
       * @param {object} event - the onsubmit event
       */
       value: function _join(event) {
        var _this = this;
        event.preventDefault();

        _fbBase.authWithOAuthPopup("twitter", function (error, authData) {
          if (error) {
            _this.setState({ joinError: "Error authenticating with Twitter: " + error.message });
          } else {
            _fbMessages.push({
              type: "event",
              text: "@" + authData.twitter.username + " has joined the room" });
          }
        }, {
          remember: "sessionOnly"
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "wrapper" },
          React.createElement(
            "header",
            { className: "header" },
            React.createElement(
              "a",
              {href:"http://rocket-design.fr"},
              React.createElement(
                "h1",
                null,
                $pageTitle
                )                   
              ),
            React.createElement(
              "h2",
              null,
              $pageSubtitle
              )  
            ),
          React.createElement(
            "div",
            { className: "main-window" },

            React.createElement(
              "div",
              { className: "header-info" },

              React.createElement('span', 
                {className: "label"},
                "Chatting as "
                ),
              this.state.user ? "@" + this.state.user : React.createElement(RegisterForm, {
                ref: "registerForm",
                onSubmit: this._join })
              ),

            React.createElement(
              "div",
              { className: "message-list-container" },
              React.createElement(MessageList, {
                messages: this.state.messages,
                currentUserId: this.state.userId }),
              this.state.userId ? React.createElement(MessageForm, { userId: this.state.userId }) : null
              ),
            React.createElement(UserList, { users: this.state.users })
            ),
          this.state.joinError ? React.createElement(
            "p",
            { className: "register-error" },
            this.state.joinError
            ) : null
          );
},
writable: true,
configurable: true
}
});

 return Application;
})(React.Component);

/**
 * Get this party started!
 */
 React.render(React.createElement(Application, null), document.body);