import './style/Nav.css';

const Label = ({ content, show }) => (
      <label htmlFor={content} className={`content-label ${show ? 'content-label-shown' : 'content-label-hidden'}`}>{content}</label>
)

export default Label;