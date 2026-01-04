// import React from 'react';
// import styled from 'styled-components';

// const Card = () => {
//   return (
//     <StyledWrapper>
//       <div className="card">
//         <h2>CARD</h2>
//       </div>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .card {
//     width: 190px;
//     height: 254px;
//     background: #07182E;
//     position: relative;
//     display: flex;
//     place-content: center;
//     place-items: center;
//     overflow: hidden;
//     border-radius: 20px;
//   }

//   .card h2 {
//     z-index: 1;
//     color: white;
//     font-size: 2em;
//   }

//   .card::before {
//     content: '';
//     position: absolute;
//     width: 100px;
//     background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
//     height: 130%;
//     animation: rotBGimg 3s linear infinite;
//     transition: all 0.2s linear;
//   }

//   @keyframes rotBGimg {
//     from {
//       transform: rotate(0deg);
//     }

//     to {
//       transform: rotate(360deg);
//     }
//   }

//   .card::after {
//     content: '';
//     position: absolute;
//     background: #07182E;
//     ;
//     inset: 5px;
//     border-radius: 15px;
//   }  
//   /* .card:hover:before {
//     background-image: linear-gradient(180deg, rgb(81, 255, 0), purple);
//     animation: rotBGimg 3.5s linear infinite;
//   } */`;

// export default Card;

import React from 'react';
import styled from 'styled-components';

const Card = ({ title, category, location, price }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <h2>{title}</h2>
        <p className="category">{category}</p>
        <p className="location">{location}</p>
        <p className="price">{price}</p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    background: #07182E;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 20px;
    color: white;
    text-align: center;
    padding: 10px;
  }

  .card h2 {
    z-index: 1;
    font-size: 1.2em;
    margin-bottom: 5px;
  }

  .card p {
    font-size: 0.9em;
    margin: 2px 0;
  }

  .card::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 130%;
    background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }

  @keyframes rotBGimg {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .card::after {
    content: '';
    position: absolute;
    background: #07182E;
    inset: 5px;
    border-radius: 15px;
  }
`;

export default Card;

