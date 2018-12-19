import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";

class CreateProfileForm extends Component {
  state = {
    profileData: {
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: ""
    },
    displaySocialInputs: false
  };

  toggleSocialInputs = () => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };

  onChange = e => {
    this.setState({
      profileData: {
        ...this.state.profileData,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.profileData);
  };

  render() {
    const { profileData, displaySocialInputs } = this.state;
    const { errors } = this.props;

    const statusOptions = [
      { value: "0", label: "* Select Professional Status" },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student Or Learning", value: "Student Or Learning" },
      { label: "Instructor Or Teacher", value: "Instructor Or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div className="social-networks">
          <InputGroup
            name="twitter"
            value={profileData.twitter}
            onChange={this.onChange}
            error={errors.twitter}
            icon="fab fa-twitter"
            placeholder="Twitter Channel URL"
          />
          <InputGroup
            name="facebook"
            value={profileData.facebook}
            onChange={this.onChange}
            error={errors.facebook}
            icon="fab fa-facebook"
            placeholder="Facebook Channel URL"
          />
          <InputGroup
            name="linkedin"
            value={profileData.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
            icon="fab fa-linkedin"
            placeholder="Linkedin Channel URL"
          />
          <InputGroup
            name="youtube"
            value={profileData.youtube}
            onChange={this.onChange}
            error={errors.youtube}
            icon="fab fa-youtube"
            placeholder="YouTube Channel URL"
          />
          <InputGroup
            name="instagram"
            value={profileData.instagram}
            onChange={this.onChange}
            error={errors.instagram}
            icon="fab fa-instagram"
            placeholder="Instagram Channel URL"
          />
        </div>
      );
    }

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            name="handle"
            value={profileData.handle}
            placeholder="* Profile handle"
            info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
            onChange={this.onChange}
            error={errors.handle}
          />
          <SelectListGroup
            name="status"
            value={profileData.status}
            onChange={this.onChange}
            info="Give us an idea of where you are at in your career"
            options={statusOptions}
            error={errors.status}
          />
          <TextFieldGroup
            name="company"
            value={profileData.company}
            placeholder="Company"
            info="Could be your own company or one you work for"
            onChange={this.onChange}
            error={errors.company}
          />
          <TextFieldGroup
            name="website"
            value={profileData.website}
            placeholder="Website"
            info="Could be your own company website"
            onChange={this.onChange}
            error={errors.website}
          />
          <TextFieldGroup
            name="location"
            value={profileData.location}
            placeholder="Location"
            info="City & state suggested (eg. Boston, MA)"
            onChange={this.onChange}
            error={errors.location}
          />
          <TextFieldGroup
            name="skills"
            value={profileData.skills}
            placeholder="* Skills"
            info="Please use comma separated values(eg. HTML, CSS, JavaScript, PHP)"
            onChange={this.onChange}
            error={errors.skills}
          />
          <TextFieldGroup
            name="githubusername"
            value={profileData.githubusername}
            placeholder="Github Username"
            info="If you want your latest repos and a Github link, include your username"
            onChange={this.onChange}
            error={errors.githubusername}
          />
          <TextAreaFieldGroup
            name="bio"
            value={profileData.bio}
            onChange={this.onChange}
            placeholder="A short bio of yourself"
            info="Tell us a little about yourself"
            error={errors.bio}
          />
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-light"
              onClick={this.toggleSocialInputs}
            >
              Add Social Network Links
            </button>
            <span className="text-muted">Optional</span>
          </div>
          {socialInputs}
          <input
            type="submit"
            className="btn btn-info btn-block mt-4"
            value="Submit"
          />
        </form>
      </React.Fragment>
    );
  }
}

CreateProfileForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default connect()(CreateProfileForm);
