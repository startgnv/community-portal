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
        name: "Cox \"Community Impact\" Award Application Form (Company Award)",
        link: "https://docs.google.com/forms/d/e/1FAIpQLScDLVXG5yAsBMZ8pWqISi3ZVYJI5IaelwiemosRZPMEP4iC7Q/viewform"
    },
    {
        name: "Cox \"Tech Employer of the Year\" Award Application Form (Company Award)",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSeuYLYLCnYNiNgGWMUz6FdjfOUQD8H7RUWomWvU9pvLA4C03g/viewform"
    },
    {
        name: "Cox \"Rising Star\" Startup Award Application Form ($5,000 Company Award)",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSePfDRdH-f68csdYyoVSHRCCEWpXuzOGODlunm6ghFU0lXVbw/viewform"
    },
    {
        name: "Cox \"Ecosystem Hidden Gem\" Award Nomination Form (Individual Award)",
        link: "https://docs.google.com/forms/d/e/1FAIpQLScl0kcPJJqi6NyWlOjk8sQcS2Gx7qXgQBdu7q_hxpiF5Y-cNw/viewform"
    },
    {
        name: "Cox Startup Mentor of the Year Award Nomination Form (Individual Award)",
        link: "https://docs.google.com/forms/d/e/1FAIpQLScQpHsb3kytCFw-b8kCg55NFZ_SbYRM8TGywLHxtG0I4r1VhA/viewform"
    },
    {
        name: "Cox \"Professional Mentor of the Year\" Award Nomination Form (Individual Award)",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSc6TXdWQnZNeY5U7YpZm3gVqJROtOnRfMK4oSZ0K7kU9nG0bQ/viewform"
    },
];


const Awards = () => {
    return(
        <>
            <Hero>
            </Hero>
            <PageContainer>
                <HeroContent>
                <h3>Awards</h3>
                <p>
                    Below are the nomination and application forms!
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