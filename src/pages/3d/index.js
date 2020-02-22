import React from 'react'
import Layout from '../../components/Layout'
import CanvasJumbotron from '../../components/ThreeJS/canvasJumbotron'

export default class BlogIndexPage extends React.Component {
    render() {
      return (
        <Layout>
          <div>
            <CanvasJumbotron />
            <h1
              className="has-text-weight-bold is-size-1"
              style={{
                boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #fff',
                backgroundColor: '#F06597',
                color: 'white',
                padding: '1rem',
              }}
            >
              Testing out 3D rendering
            </h1>
          </div>
        </Layout>
      )
    }
  }