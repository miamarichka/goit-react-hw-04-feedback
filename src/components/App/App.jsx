import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Statistics } from '../Statistics/Statistics';
import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions';
import { Notification } from '../Notification/Notification';
import { Section } from '../Section/Section';
import {Container} from './Container.styled'

export const App = () => {
  const [goodFeedbackCount, setGoodFeedbackCount] = useState(0);
  const [neutralFeedbackCount, setNeutralFeedbackCount] = useState(0);
  const [badFeedbackCount, setBadFeedbackCount] = useState(0);

  const onFeedbackClick = e => {
    switch (e.target.textContent) {
      case 'Good':
        setGoodFeedbackCount(prevState =>
          prevState + 1)
        break;
      case 'Neutral':
        setNeutralFeedbackCount(prevState =>
          prevState + 1)
        break;
      case 'Bad':
        setBadFeedbackCount(prevState =>
          prevState + 1)
        break;
      default:
        alert('Please, rate the servise');
    }
  };

  const countTotalFeedback = () => {
    let total = goodFeedbackCount + neutralFeedbackCount + badFeedbackCount;
    return total;
  }

  const countPositiveFeedbackPercentage = () => {
    let total = goodFeedbackCount + neutralFeedbackCount + badFeedbackCount;
    let positiveFeedback = Math.round((goodFeedbackCount / total) * 100) || 0;
    return positiveFeedback;
  }

    const isFeedbackExist = countTotalFeedback() ? (
      <Statistics
        good={goodFeedbackCount}
        neutral={neutralFeedbackCount}
        bad={badFeedbackCount}
        total={countTotalFeedback()}
        positivePercentage={countPositiveFeedbackPercentage()}
      />
    ) : (
        <Notification message={'There is no feedback'} />
      )

    return (
      <Container>
        <Section
          title={'Please leave feedback'}
          toRender={<FeedbackOptions onLeaveFeedback={onFeedbackClick} />}
        />
        <Section title={'Statistics'} toRender={isFeedbackExist} />
      </Container>
    );
}

App.prototype = {
  goodFeedbackCount: PropTypes.number,
  neutralFeedbackCount: PropTypes.number,
  badFeedbackCount: PropTypes.number,
}
