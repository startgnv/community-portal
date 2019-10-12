import React from 'react';
import styled from 'styled-components/macro';
import Hero from './Hero';
import culturePhoto from '../assets/images/culture.jpg';
import cade from '../assets/images/cade.jpg';
import uf from '../assets/images/uf.jpg';
import ichetucknee from '../assets/images/ichetucknee-springs.jpg';
import boxcar from '../assets/images/boxcar.jpg';
import shands from '../assets/images/shands.jpg';
import school from '../assets/images/school.jpg';
import depot from '../assets/images/depot.jpg';
import crescent from '../assets/images/crescent.jpg';
import divider from '../assets/images/whygnv-divider.jpg';

const WhyGainesvilleContainer = styled.div``;

const HeroHeadline = styled.h2`
  font-size: 46px;
  color: white;

  strong {
    color: ${({ theme }) => theme.teal};
    font-weight: 700;
  }
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 725px;
  margin: 0 auto;
  padding: 120px 0;
  text-align: center;

  &:after {
    position: absolute;
    width: 2px;
    height: 60px;
    left: 50%;
    bottom: 30px;
    background-color: ${({ theme }) => theme.yellow};
    content: '';
  }
`;

const CopyWithImageContainer = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 80px 0 60px;
`;

const CopyWithImageContent = styled.div`
  position: relative;
  max-width: 425px;
  padding: 60px;
  box-shadow: 4px 5px 13px rgba(180, 180, 180, 0.24);
  box-sizing: border-box;
  background-color: white;
  z-index: 10;
`;

const CopyWithImagePhoto = styled.img`
  position: absolute;
  max-width: 687px;
  top: 0;
  right: 0;
  x-index: 1;
`;

const Divider = styled.div`
  height: 210px;
  margin-bottom: 60px;
  background: url(${divider});
  background-size: cover;
  background-position: center;
`;

const WhyGainesvillePage = () => (
  <WhyGainesvilleContainer>
    <Hero size="small">
      <HeroHeadline>
        Gainesville <strong>101</strong>
      </HeroHeadline>
    </Hero>
    <HeroContent>
      <h2>Notable Track Record</h2>
      <p>
        Gainesville is a mid-size city in the middle of Florida with a quiet
        buzzing of builders and thinkers. It is the birthplace of Gatorade, home
        to the complete lifecycle of Grooveshark, a music sharing platform, and
        a place of growth for Olympic athletes, Pulitzer Prize winners, and a
        MacArthur ‘Genuis Grant’ Recipient.
      </p>
    </HeroContent>
    <CopyWithImageContainer>
      <CopyWithImagePhoto src={culturePhoto} />
      <CopyWithImageContent>
        <h2>Community Successes</h2>
        <p>
          Gainesville and its institutions have enjoyed many wins and success
          stories over the years. It doesn’t look like it's slowing down either.
          In 2019 alone Fracture, a glass photo printing company, has expanded
          into a new 60,000 sq. ft. office and Sharpspring, a marketing
          automation company, joined the Russell 3000® Index. Both are a sign of
          the type of growth happening right now.
        </p>
      </CopyWithImageContent>
    </CopyWithImageContainer>
    <CopyWithImageContainer>
      <CopyWithImagePhoto src={cade} />
      <CopyWithImageContent>
        <h2>Community Supports</h2>
        <p>
          Gainesville at large is an ecosystem supported by great resources for
          inspiration and the support of ideas like the Cade Museum for
          Creativity and Invention, the San Felasco Tech City, the Florida
          Natural History Museum and The 2017 Incubator of The Year: The Sid
          Martin Biotech.
        </p>
      </CopyWithImageContent>
    </CopyWithImageContainer>
    <Divider />
    <CopyWithImageContainer>
      <CopyWithImagePhoto src={uf} />
      <CopyWithImageContent>
        <h2>University</h2>
        <p>
          Gainesville is home to The University of Florida, the 7th best public
          university in the United States. UF goes beyond education and weaves
          itself into the community with investments like UF Innovate | The Hub
          and the Innovation District. In the last 15 years UF has spun off 190
          startup companies from its researchers’ technologies and brought in
          $776 million in research awards in the 2019 fiscal year.
        </p>
      </CopyWithImageContent>
    </CopyWithImageContainer>
    <CopyWithImageContainer>
      <CopyWithImagePhoto src={ichetucknee} />
      <CopyWithImageContent>
        <h2>Everyday Nature</h2>
        <p>
          Sunny Gainesville Florida is also a great place to live with an
          average of 224 sunny days per year and an average high of 82 F.
          Winters are mild with an average low of 45 F. Water is plentiful from
          the 50 inches of rain per year and its abundant natural structures
          like the springs.
        </p>
      </CopyWithImageContent>
    </CopyWithImageContainer>
    <CopyWithImageContainer>
      <CopyWithImagePhoto src={depot} />
      <CopyWithImageContent>
        <h2>Adventure</h2>
        <p>
          When you are ready to go exploring, Gainesville is uniquely prepared
          for your needs. For a relaxing afternoon stroll the Kanapaha Botanical
          Gardens provide scenic and shaded paths. For a higher energy escape
          once can try mountain biking in the San Felasco Hammock Preserve State
          Park. Other great spots to check out include Ichetucknee Springs,
          Loblolly Trail, and Devil’s Millhopper.
        </p>
      </CopyWithImageContent>
    </CopyWithImageContainer>
    <Divider />
    <CopyWithImageContainer>
      <CopyWithImagePhoto src={boxcar} />
      <CopyWithImageContent>
        <h2>Food & Drinks</h2>
        <p>
          Gainesville has a vibrant dining scene with local favorites like
          Satchel's Pizza, The Top, Dragonfly Sushi & Sake Company and Las
          Margarita's. Stylish cocktail bars like Cry Baby’s, The Dime, and laid
          back venues like the Boxcar Beer and Wine Garden are great meeting
          spots to catch up with friends. For more local insights you can check
          out the blog: Ken Eats Gainesville.
        </p>
      </CopyWithImageContent>
    </CopyWithImageContainer>
    <CopyWithImageContainer>
      <CopyWithImagePhoto src={cade} />
      <CopyWithImageContent>
        <h2>Livability</h2>
        <p>
          In Gainesville, transportation costs and expenses for housing and
          health care have brought the city’s cost of living down to 2% below
          the national average. Because of the low cost of living and lack of
          income tax in Florida, Gainesville salaries go a lot further than
          those of many other places in the U.S. Gainesville also has some of
          the shortest commute times in the country. The average car ride to
          work is about 20 minutes.
        </p>
      </CopyWithImageContent>
    </CopyWithImageContainer>
    <Divider />
    <CopyWithImageContainer>
      <CopyWithImagePhoto src={shands} />
      <CopyWithImageContent>
        <h2>World Class Medical Facilities</h2>
        <p>
          Remarkable health institutions like UF Health and North Florida
          Regional Medical Center will give you and your family the highest
          quality personalized care. UF Health specializes in more than 100
          medical areas, including cancer treatment and research, heart care,
          transplant surgeries, rehab, psychiatry, neuromedicine and women and
          children’s services. North Florida Regional Medical Center: NFRMC is a
          fully accredited 432-bed medical and surgical acute care center.
        </p>
      </CopyWithImageContent>
    </CopyWithImageContainer>
    <CopyWithImageContainer>
      <CopyWithImagePhoto src={school} />
      <CopyWithImageContent>
        <h2>High-Performing School System</h2>
        <p>
          Gainesville’s school system, Alachua County Public Schools produces
          students that score some of the highest SAT scores in the state, and
          even the nation. It was awarded the title, ‘District of the Year,’ for
          2018 by Cambridge Assessment International Education in May for
          success in running a program that allows students to earn college
          credit while still in high school.
        </p>
      </CopyWithImageContent>
    </CopyWithImageContainer>
    <Divider />
    <CopyWithImageContainer>
      <CopyWithImagePhoto src={crescent} />
      <CopyWithImageContent>
        <h2>Easy to Get Away, Too</h2>
        <p>
          It is easy to get wherever you need to go with everything you need
          only one to two-hours away. Major international airports in
          Jacksonville and Orlando have affordable international and domestic
          flights. If you’re a fan of the ocean, Crescent Beach, St. Augustine
          and Cedar Key are great choices. And world-class theme parks like
          SeaWorld, Disney World and Universal Studios are fun weekend trip
          destinations.
        </p>
      </CopyWithImageContent>
    </CopyWithImageContainer>
  </WhyGainesvilleContainer>
);

export default WhyGainesvillePage;
