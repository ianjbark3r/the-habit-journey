import React, { Component } from 'react';

export default class LearnMore extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <h1 style={{ paddingTop: "15vh" }} className="display-3 mb-4">You are what you do today.</h1>
          </div>          
        </div>
        <div style={{ fontSize:"1.2em", lineHeight:"28pt" }} className="row justify-content-center mt-3">
          <div className="col-sm-4">
            <p>
              <span style={{ fontSize:"1.2em" }} className="lead">Every day, you decide who you are–not in big, grandiose gestures, but in small, automatic actions.</span>
            </p>
            <p>  
              Brushing your teeth, greeting the neighbor–the things you do every day are like votes you cast to determine who you want to be. A morning jog? Count that as a vote for a “fitter” you. A daily bag of Doritos? Unfortunately, probably the opposite (just don’t tell my tastebuds that).
            </p>
            <p>
              If your brain had an election, counting all of your daily behaviors as votes, what version of you would win today? Not this week, not this month, but today. Did you take a raincheck on that Rick & Morty episode for some quality time with the family? Did you say “yes” to a few too many distractions at work today? If you truly sat down with pen and paper and tallied up your actions, which version of you would win the day?
            </p>
            <p>
              Society tends to glorify big, dramatic actions when it determines the character of a person. They see the flash and pomp as representing the magnitude of their values. But answer me this: who makes more of a difference in their life? The 94 year-old individual who planted a tree every day their entire life, or the eccentric billionaire who purchased and planted 5,000 trees once?
            </p>
          </div>
          <div className="col-sm-4 mb-4">
            <p>
              Your daily habits are what determine who you are, and with really exciting reprecussions. If you choose to embody the habits of a “fit” person, you won’t just cut some fat or build some strength. After a while, you’ll achieve heights you didn’t think possible. If you choose to embody the habits of a “kind” person, you won’t just give to charity, you’ll make a lasting and permanent difference in a community.
            </p>
            <p>
              This app is built from the ground up using the system outlined in James Clear’s incredible book <a href="https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299">“Atomic Habits”</a>. By using this app, you will be guided through the process of grounding habits in your desired identities, and then structuring those habits in a way that frees your mind from worry, eventually becoming automatic.
            </p>
            <p>
              The end result? Well, that’s the thing: there is no end. Being who you want to be is an everyday endeavor. But through this structure, we can automate our daily votes for our desired identities until “who I want to be” and “who I am” are the same person. <i>That’s the journey</i>. That’s the power of habits, just waiting for you to take the first step and unlock your own potential.
            </p>
          </div>
        </div>
      </div>
    );
  }
};