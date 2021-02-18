const Section = ({name, content, imagesLink}) => {
   return (
      <section>
         <h3>{name}</h3>
         {content ? <p>{content}</p> : ''}
         <div className='images'>
            {imagesLink.map((imageLink, key) => (
               <img key={key} src={imageLink} alt='section-image' />
            ))}
         </div>
      </section>
   )
}

export default Section;