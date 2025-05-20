import Layout from '../components/Layout/Layout'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Services } from '../content/termsOfService'

const Service = () => {
  return (
    <Layout title={"Terms of Service"}>
       <div className="policy-wrapper" >
          <div className="policy-block">
            <h1 className="policy-title">Terms and Conditions</h1>

            {Services.map((e, i) => (
              <div key={i} className="policy-section">
                <h3 className="policy-heading">{e.section}</h3>
                <ReactMarkdown>
                  {e.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
      </div>   
    </Layout>
  )
}

export default Service
