import React from 'react';
import PageContainer from 'src/components/Site/UI/PageContainer';
import Hero from 'src/components/Site/UI/Hero';
import styled from 'styled-components';

const HeroContent = styled.div`
  position: relative;
  max-width: 725px;
  margin: 0 auto;
  padding: 60px 0;
  text-align: center;

  p {
    margin-top: 7px;
  }
`;
const Form = styled.li`
  padding: 20px;
  margin-bottom: 10px;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
  background: white;
  transition: 200ms;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    box-shadow: 3px 3px 13px 0 rgba(0, 0, 0, 0.15);
    transform: scale(1.04);
    transform-origin: center;
  }
  >a{
      width: 100%;
      height: 100%;
      &:visited{
          color: black;
      }
  }
`;

const forms = [
    {
        name: "Board Application Form",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSdYRr1PkiBeodVY7gihjN-o9SRP0znmoD-_odHD-N3i1ulBBg/viewform"
    }
];


const Awards = () => {
    return(
        <>
            <Hero>
            </Hero>
            <PageContainer>
                <HeroContent>
                <h3>Board Application Form</h3>
                <p>
                    Below is the board member application!
                </p>
                </HeroContent>
                <ul>
                    {
                        forms.map(form => (
                            <Form key={form.name}>
                                <a href={form.link}>{form.name}</a>
                            </Form>
                        ))  
                    }
                </ul>
            </PageContainer>
        </>
    );
};


export default Awards;