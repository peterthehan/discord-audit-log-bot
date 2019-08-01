const ActivityFactory = require('../classes/ActivityFactory');
const isLoggedGuild = require('../util/isLoggedGuild');
const send = require('../util/send');

const loggedActivityType = ['STREAMING'];

const _isSameActivity = (oldActivity, newActivity) =>
  (!oldActivity && !newActivity) ||
  (oldActivity && oldActivity.equals(newActivity)) ||
  (newActivity && newActivity.equals(oldActivity));

const _isLoggedActivity = (oldActivity, newActivity, type) =>
  (oldActivity && oldActivity.type === type) ||
  (newActivity && newActivity.type === type);

const _getActivityState = (oldActivity, newActivity, type) => {
  if (
    (!oldActivity || oldActivity.type !== type) &&
    newActivity.type === type
  ) {
    return {
      state: 'true',
      activity: newActivity
    };
  } else if (
    (!newActivity || newActivity.type !== type) &&
    oldActivity.type === type
  ) {
    return {
      state: 'false',
      activity: oldActivity
    };
  }

  return {
    state: 'null',
    activity: newActivity
  };
};

module.exports = (oldPresence, newPresence) => {
  if (!isLoggedGuild(newPresence.guild)) return;

  const oldActivity = oldPresence ? oldPresence.activity : null;
  const newActivity = newPresence.activity;
  if (_isSameActivity(oldActivity, newActivity)) return;

  const type = loggedActivityType.find(type =>
    _isLoggedActivity(oldActivity, newActivity, type)
  );
  if (!type) return;

  const activityState = _getActivityState(oldActivity, newActivity, type);
  const embed = new ActivityFactory(activityState).createAuditLogEmbed(type);
  if (!embed) return;

  const user = [oldPresence, newPresence].filter(Boolean)[0].user;
  embed.setUser(user);

  send(newPresence.guild, embed);
};
