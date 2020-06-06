import React from "react";
import "./SocialAuth.scss";

const SocialAuth = () => {
  const providers = ["google", "facebook"];
  const basePath = "https://champs-bn-api.herokuapp.com/api/v1";

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
