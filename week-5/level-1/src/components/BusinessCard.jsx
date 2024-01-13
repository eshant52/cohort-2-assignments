import Button from "./Button";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import instagram from "../assets/instagram.svg";

/* eslint-disable react/prop-types */
export default function BusinessCard({ data }) {
  const icons = {
    facebook,
    linkedin,
    twitter,
    instagram,
  };

  return (
    <div className="card-container">
      <div className="card">
        <div>
          <h3 className="card__name">{data.name}</h3>
          <p className="card__desc">{data.description}</p>
        </div>
        <div>
          <h5>Interests</h5>
          <ul className="card__interests-ul">
            {data.interests.map((interest, index) => (
              <li className="card__interests-li" key={index}>
                {interest}
              </li>
            ))}
          </ul>
        </div>
        <div className="card__social-links">
          <div>Follow me: </div>
          <div className="card__button-list">
            {Object.entries(data.socialLinks).map(([name, link], index) => (
              <Button key={index} link={link}>
                <img src={icons[name]} alt={name} height={30} />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
