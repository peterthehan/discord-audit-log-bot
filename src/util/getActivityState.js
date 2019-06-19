module.exports = (oldActivity, newActivity, type) => {
  if (
    (!oldActivity || oldActivity.type !== type) &&
    newActivity.type === type
  ) {
    return {
      key: 'true',
      activity: newActivity
    };
  } else if (
    (!newActivity || newActivity.type !== type) &&
    oldActivity.type === type
  ) {
    return {
      key: 'false',
      activity: oldActivity
    };
  }

  return {
    key: 'null',
    activity: newActivity
  };
};
