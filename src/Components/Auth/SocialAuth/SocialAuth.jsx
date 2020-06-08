import React from "react";
import "./SocialAuth.scss";
import basePath from "../../../Utils/basePath";

const SocialAuth = () => {
  const providers = ["google", "facebook"];

  const handleSignInClick = provider => {
    window.open(`${basePath}/auth/${provider}`, "_self");
  };
  return (
    <div className="social-signin-section">
      <span className="social-signin-section__oauth-text">
        {" "}
        with your social network{" "}
      </span>
      <div>
        {providers.map(provider => (
          <button
            className={`social-signin-section__oauth-logos social-signin-section__${provider}`}
            onClick={() => handleSignInClick(provider)}
            type="button"
            key={provider}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;
