import React, { useEffect } from "react";
import { NextPage } from "next";
import sortBy from "lodash/sortBy";
import { Grid } from "gridjs";

const populate = (data) => {
  const sorted = sortBy(data, ["cases"]).reverse();
  return sorted.map((country) => {
    const percentageActiveCases = (
      (country.active / country.cases) *
      100
    ).toFixed(2);

    const fatalityRate = (
      (country.deaths / (country.cases - country.active)) *
      100
    ).toFixed(2);

    const recoveryRate = (
      (country.recovered / (country.cases - country.active)) *
      100
    ).toFixed(2);

    return [
      country.country,
      country.cases,
      country.active,
      percentageActiveCases,
      country.deaths,
      fatalityRate,
      country.recovered,
      recoveryRate,
      country.tests,
      country.testsPerOneMillion,
    ];
  });
};

const formatNumber = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const formatPercentage = (number) => `${number}%`;

const formatNA = (number) => (number === 0 ? `N/A` : number);

const Home: NextPage = () => {
  const grid = new Grid({
    columns: [
      {
        name: "Country",
      },
      {
        name: "Total Confirmed Cases",
        formatter: (cell) => formatNumber(cell),
      },
      {
        name: "Active Cases",
        formatter: (cell) => formatNumber(cell),
      },
      {
        name: "Active Cases (%)",
        formatter: (cell) => formatPercentage(cell),
      },
      {
        name: "Total Deaths",
        formatter: (cell) => formatNumber(cell),
      },
      {
        name: "Fatality Rate",
        formatter: (cell) => formatPercentage(cell),
      },
      {
        name: "Recovered Cases",
        formatter: (cell) => formatNumber(formatNA(cell)),
      },
      {
        name: "Recovery Rate",
        formatter: (cell) => formatPercentage(cell),
      },
      {
        name: "Total Tests",
        formatter: (cell) => formatNumber(cell),
      },
      {
        name: "Tests per million",
        formatter: (cell) => formatNumber(cell),
      },
    ],
    sort: true,
    search: {
      enabled: true,
      placeholder: "Search",
    },
    server: {
      url: "https://disease.sh/v2/countries",
      then: (data) => populate(data),
    },
  });

  useEffect(() => {
    grid.render(document.getElementById("wrapper"));
  });

  return (
    <div>
      <div id="wrapper" />
      <div id="details">
        <ul>
          <li>
            <strong>Fatality Rate</strong> is the people deceased out of the
            total closed cases (total confirmed cases - total active cases)
          </li>
          <li>
            <strong>Recovery Rate</strong> is the people recovered out of the
            total closed cases (total confirmed cases - total active cases)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
