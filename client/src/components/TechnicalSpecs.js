import React from "react";
import { Descriptions } from "antd";
import styled from "styled-components";

const TechnicalSpecs = ({
  make,
  model,
  capacity,
  year,
  color,
  bodyType,
  gearboxType,
  mileage,
  fuelType,
  hourlyPrice,
}) => {
  const Wrapper = styled.main`
    .ant-descriptions {
      border: 3px solid black;
    }
  `;

  return (
    <Wrapper>
      <Descriptions
        title="Szczegóły oferty"
        bordered
        layout="vertical"
        column={5}
      >
        <Descriptions.Item label="Marka">{make}</Descriptions.Item>
        <Descriptions.Item label="Model">{model}</Descriptions.Item>
        <Descriptions.Item label="Ilość osób">{capacity}</Descriptions.Item>
        <Descriptions.Item label="Rok produkcji">{year}</Descriptions.Item>
        <Descriptions.Item label="Kolor">{color}</Descriptions.Item>
        <Descriptions.Item label="Rodzaj karoserii">
          {bodyType}
        </Descriptions.Item>
        <Descriptions.Item label="Rodzaj skrzyni biegów">
          {gearboxType}
        </Descriptions.Item>
        <Descriptions.Item label="Przebieg">{mileage}km</Descriptions.Item>
        <Descriptions.Item label="Rodzaj paliwa">{fuelType}</Descriptions.Item>
        <Descriptions.Item label="Cena za godzinę">
          {hourlyPrice}zł
        </Descriptions.Item>
      </Descriptions>
    </Wrapper>
  );
};

export default TechnicalSpecs;
