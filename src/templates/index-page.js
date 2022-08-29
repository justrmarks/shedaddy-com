import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import { kebabCase } from 'lodash'
import InViewSketch from '../components/p5sketches/intersectObserverSketch'
import { sketch } from '../components/p5sketches/coloredNoise-p5-wrapper'


import FramerTile from '../components/animate/FramerTile';


import "../styles/home.scss"


const IndexPageTemplate = ({
  title,
  heading,
  subheading,
  mainpitch,
  intro
}) => {
  return (
  <div className='index-page'>

    <FramerTile>
      <div
        className="index__jumbotron full-width-image margin-top-0"
        style={{
          // backgroundColor: "#111", 
        position: 'relative',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        }}
      >
        {/* inside jumbotron*/}
        <InViewSketch sketch={sketch} className="inViewSketch" 
        style={{zIndex: '1',
        // width: '400px', 
        height: '400px', 
        // position: 'absolute'
      }}
        />

        <div className='jumbotron__text'
          // style={{
          //   position: 'absolute',
          //   display: 'flex',
          //   height: '80%',
          //   lineHeight: '1',
          //   justifyContent: 'space-between',
          //   alignItems: 'left',
          //   flexDirection: 'column',
          //   zIndex: 2

          // }}
        >
          <h1
            className="is-title has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
            style={{
              // boxShadow:'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
              // backgroundColor: '#F06597',
              color: 'white',
              lineHeight: '1',
              padding: '0.25em',
              alignSelf: 'flex-start',
              zIndex: 2
            }}
          >
            {title}
          </h1>
          <h2
            className="has-text-weight-semibold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
            style={{
              // boxShadow:'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
              // backgroundColor: '#F06597',
              color: 'white',
              lineHeight: '1',
              padding: '0.25em',
              alignSelf: 'flex-end',
              zIndex: 2
            }}
          >
            {subheading}
          </h2>
        </div>
      </div>
    </FramerTile>

    <section className="section section--gradient">
      <div className="content__container content">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content content__outer">

                <FramerTile>
                  <div className="content content__inner">
                    <div className="tile">
                      <h1 className="title">{mainpitch.title}</h1>
                    </div>

                    <div className="tile">
                      <h3 className="subtitle">{mainpitch.description}</h3>
                    </div>

                  </div>
                </FramerTile>


                <div className="columns">
                  <div className="column is-12">
                    <FramerTile>
                      <h3 className="has-text-weight-semibold is-size-3">
                        {heading}
                      </h3>
                    </FramerTile>
        {intro.blurbs.filter(Boolean).map((blurb, i)=> <FramerTile key={`blurb-${i}`}><section key={blurb.heading}>
            <h4>{blurb.heading}</h4> 
            <p>{blurb.body}</p> 
            <Link to={`/tags/${kebabCase(blurb.tag)}`}> Read more about how She Daddy is doing {blurb.tag} </Link>
           
           </section> </FramerTile>)}
                    
                  </div>
                  
                </div>
            
              </div>
            
            </div>

      

          </div>
        </div>
      </div>
    </section>
  </div>
)}

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
