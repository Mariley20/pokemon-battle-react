import React from 'react'

const CardPokemon = ({ children, name, imgSrc, lifeTime, attack }) => {
  return (
    <section className="card">
      <div className="card__header">{name}</div>
      <div className="card__container">
        <img src={imgSrc} alt="" />
        <div className="card__text">
          <p><strong>Vida: </strong>{lifeTime}</p>
          <p><strong>Ataque: </strong>{attack}</p>
        </div>
      </div>
      <div className="card__action">
        {children}
      </div>
    </section>
  )
}

export default CardPokemon
