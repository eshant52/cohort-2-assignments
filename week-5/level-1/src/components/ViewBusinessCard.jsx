/* eslint-disable react/prop-types */
import BusinessCard from "./BusinessCard";

export default function ViewBusinessCard({businessCards}) {

  return (
    <div className="card-list">
      {businessCards.map((businessCard) => (
        <BusinessCard key={businessCard._id} data={businessCard} />
      ))}
    </div>
  );
}