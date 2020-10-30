import React from "react";

class NameForm extends React.Component {
  constructor(props) {
    super(props);// super()是必须，虽然用不到props，但是，还是放一下，完美一点;
    this.input = React.createRef();
  }

  handleSubmit = (e) => {
    console.log("A name was submitted:" + this.input.current.value);
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm;
