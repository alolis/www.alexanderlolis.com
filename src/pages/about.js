import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function About() {
  const {siteConfig = {}} = useDocusaurusContext();

  return (
    <Layout
      title="About"
      description="About Alexander Lolis"
    >
    <div className="container margin-vert--lg">
      <div style={{justifyContent: 'center'}} className="row">
        <main className="col col--7">
          <h1>About</h1>
          <p>I am Alexander Lolis, a software engineer at heart and mind with a snowboarder’s soul.</p>
          <p>This is my personal space in which I am mostly writing about software, business, management, or whatever else that might come to mind on a weird day.</p>
          <p>
            I have been into computer science since forever and I feel very fortunate that my passion became such a large part of my life. I find software truly fascinating and I hope to pass
            some knowledge to anyone reading my blog, and help them deal with the madness of software development.
          </p>
          <p>I am currently the CTO of <a target="_blank" href="https://rapiddot.com">Rapiddot Ltd</a>, a hosting services company. In my free time, I enjoy outdoor activities, especially when I am on the mountains!</p>
          <p>Feel free to <a href="mailto:alexander.lolis@gmail.com">drop me a line!</a></p>
        </main>
      </div>
    </div>
  </Layout>
  )
}

export default About;