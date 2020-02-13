import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { kebabCase } from 'lodash'



export const IndexPageTemplate = ({
  title,
  heading,
  subheading,
  mainpitch,
  intro
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{backgroundColor: "#ffee00"
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '80%',
          lineHeight: '1',
          justifyContent: 'space-between',
          alignItems: 'left',
          flexDirection: 'column',

        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
            alignSelf: 'flex-start'
          }}
        >
          {title}
        </h1>
        <h2
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
            alignSelf: 'flex-end'
          }}
        >
          {subheading}
        </h2>
      </div>
    </div>

    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
        {intro.blurbs.filter(Boolean).map((blurb)=> <section key={blurb.heading}>
            <h4>{blurb.heading}</h4> 
            <p>{blurb.body}</p> 
            <Link to={`/tags/${kebabCase(blurb.tag)}`}> Read more about how She Daddy is doing {blurb.tag} </Link>
           
           </section> )}
                    
                  </div>
                  
                </div>
            
              </div>
            
            </div>

      

          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
        subheading
        mainpitch {
          title
          description
        }
        intro {
          blurbs {
            tag
            heading
            body
          }
        }
      }
    }
  }
`
