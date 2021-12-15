// @ts-nocheck
import React from 'react';
import Layout from 'components/Layout';

const Home = () => {
  return <Layout>
    <div className="row">
      <div className="col-9">
        <div className="alert alert-warning mt-5" style={{ fontSize: '0.8rem' }} role="alert">
          <div><b>Your profile is almost completed!</b></div>
          <div>Please go through Proffesional Qulifications and Work Experience and see if you missed on any updates.</div>
        </div>
        <div className="row my-5">
          <div className="col-6 row">
            <div className="col-4 h-100 my-auto dash-image" style={{ backgroundImage: 'url(dashboard/illustration_job.png)' }} ></div>
            <div className="col-8 my-auto">
              <div className="dash-title row">Personal Information <span className="dash-item-status success"></span> </div>
              <div className="dash-description row">Add your contact information so that it will give more credibility to your profile and make it easier for people to reach to you</div>
              <div className="dash-action row"><a href="#">Update</a></div>
            </div>
          </div>
          <div className="col-6 row ">
            <div className="col-4 h-100 my-auto dash-image" style={{ backgroundImage: 'url(dashboard/illustration_women_career.png' }}></div>
            <div className="col-8 my-auto">
              <div className="dash-title row">Work Experience<span className="dash-item-status failed"></span></div>
              <div className="dash-description row">Add your contact information so that it will give more credibility to your profile and make it easier for people to reach to you</div>
              <div className="dash-action row"><a href="#">Update</a></div>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-6 row">
            <div className="col-4 h-100 my-auto dash-image" style={{ backgroundImage: 'url(dashboard/illustration_fly.png)' }}></div>
            <div className="col-8 my-auto">
              <div className="dash-title row">Personal Information <span className="dash-item-status warning"></span> </div>
              <div className="dash-description row">Add your contact information so that it will give more credibility to your profile and make it easier for people to reach to you</div>
              <div className="dash-action row"><a href="#">Update</a></div>
            </div>
          </div>
          <div className="col-6 row">
            <div className="col-4 h-100 my-auto dash-image" style={{ backgroundImage: 'url(dashboard/illustration_chart.png)' }}></div>
            <div className="col-8 my-auto">
              <div className="dash-title row">Work Experience<span className="dash-item-status success"></span></div>
              <div className="dash-description row">Add your contact information so that it will give more credibility to your profile and make it easier for people to reach to you</div>
              <div className="dash-action row"><a href="#">Update</a></div>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-6 row">
            <div className="col-4 h-100 my-auto dash-image" style={{ backgroundImage: 'url(dashboard/illustration_women_job.png)' }}></div>
            <div className="col-8 my-auto">
              <div className="dash-title row">Personal Information <span className="dash-item-status success"></span> </div>
              <div className="dash-description row">Add your contact information so that it will give more credibility to your profile and make it easier for people to reach to you</div>
              <div className="dash-action row"><a href="#">Update</a></div>
            </div>
          </div>
          <div className="col-6 row">
            <div className="col-4 h-100 my-auto dash-image" style={{ backgroundImage: 'url(dashboard/illustration_drone.png)' }}></div>
            <div className="col-8 my-auto">
              <div className="dash-title row">Work Experience<span className="dash-item-status success"></span></div>
              <div className="dash-description row">Add your contact information so that it will give more credibility to your profile and make it easier for people to reach to you</div>
              <div className="dash-action row"><a href="#">Update</a></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="text-center mt-5">YOUR PROFILE RATING</div>
            <div className="mt-4">
              <div className="progress green">
                <span className="progress-left">
                  <span className="progress-bar"></span>
                </span>
                <span className="progress-right">
                  <span className="progress-bar"></span>
                </span>
                <div className="progress-value">6.8</div>
              </div>
              <div className="text-center mt-4 small">
                Know Where you stand<br />
                among the others in<br />
                your category
              </div>
              <div className="mt-3">
                <div className="font-weight-bold mb-2">Profile status for Tech</div>
                <div className="row"><div className="col-8">Highest rating</div><div className="col-4 text-right">8.9</div></div>
                <div className="row"><div className="col-8">Lowest Rating</div><div className="col-4 text-right">4.2</div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-50 w-100 dashboard-contianer-bg " style={{ backgroundImage: 'url(dashboard/dashboard_image.png)' }}></div>
      </div>
    </div>
  </Layout>;
};

export default Home;
