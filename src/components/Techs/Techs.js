import './Techs.css';

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <p className="techs__subtitle">9 технологий</p>
        <p className="techs__subtitle-info">
          В проекте применил технологии которые изучил на курсе разработки и освоил самостоятельно.
        </p>
        <ul className="techs__grid">
          <li className="techs__grid-item">HTML</li>
          <li className="techs__grid-item">CSS</li>
          <li className="techs__grid-item">SASS</li>
          <li className="techs__grid-item">JS</li>
          <li className="techs__grid-item">React</li>
          <li className="techs__grid-item">Redux</li>
          <li className="techs__grid-item">Git</li>
          <li className="techs__grid-item">Express.js</li>
          <li className="techs__grid-item">mongoDB</li>
        </ul>
      </div>
    </section>
  )
}
