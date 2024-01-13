/* eslint-disable react/prop-types */
export default function Button({link, children}) {
  return (
    <a className="card__button" href={link}>
      {children}
    </a>
  );
}