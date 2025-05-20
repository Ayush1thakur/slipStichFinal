import React from "react";
import Layout from '../components/Layout/Layout';
import { policies } from "../content/ourPolicies";
import ReactMarkdown from "react-markdown";
import './policy.css';

const Policy = () => {
  return (
    <Layout title={"Our Policies"}>
      <div className="policy-wrapper" >
        {policies.map((ele, index) => (
          <div key={index} className="policy-block">
            <h1 className="policy-title">{ele.title}</h1>
            {ele.para? <ReactMarkdown>{ele.para}</ReactMarkdown> : <></>
            }
            {ele.sections.map((section, i) => (
              <div key={i} className="policy-section">
                <h3 className="policy-heading">{section.heading}</h3>
                <ReactMarkdown>
                  {section.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Policy;
