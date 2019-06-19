const getActivityState = require('../util/getActivityState');
const getDescription = require('../util/getDescription');
const getFooter = require('../util/getFooter');
const getListeningActivity = require('../util/getListeningActivity');
const getStreamingActivity = require('../util/getStreamingActivity');
const isInvalidGuild = require('../util/isInvalidGuild');
const sendLog = require('../util/sendLog');

const isSameActivity = (oldActivity, newActivity) =>
  (!oldActivity && !newActivity) ||
  (oldActivity && oldActivity.equals(newActivity)) ||
  (newActivity && newActivity.equals(oldActivity));

const isLoggedActivity = (oldActivity, newActivity, type) =>
  (oldActivity && oldActivity.type === type) ||
  (newActivity && newActivity.type === type);

module.exports = (oldPresence, newPresence) => {
  const guild = newPresence.guild;
  if (isInvalidGuild(guild)) return;

  const oldActivity = oldPresence ? oldPresence.activity : null;
  const newActivity = newPresence.activity;
  if (isSameActivity(oldActivity, newActivity)) return;

  const type = ['STREAMING'].find(type =>
    isLoggedActivity(oldActivity, newActivity, type)
  );
  if (!type) return;

  const { key, activity } = getActivityState(oldActivity, newActivity, type);

  let map = null;
  if (type === 'LISTENING') {
    map = getListeningActivity(key, activity);
  } else if (type === 'STREAMING') {
    map = getStreamingActivity(key, activity);
  }
  if (!map) return;

  const user = [oldPresence, newPresence].filter(Boolean)[0].user;
  return sendLog(guild, map.color, {
    ...getDescription(user, map.content),
    ...getFooter(user, map.state.footerText)
  });
};
