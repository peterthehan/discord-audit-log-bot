const ActivityFactory = require('../classes/ActivityFactory');
const getActivityState = require('../util/getActivityState');
const isInvalidGuild = require('../util/isInvalidGuild');
const isLoggedActivity = require('../util/isLoggedActivity');
const isSameActivity = require('../util/isSameActivity');
const send = require('../util/send');

module.exports = (oldPresence, newPresence) => {
  if (isInvalidGuild(newPresence.guild)) return;

  const oldActivity = oldPresence ? oldPresence.activity : null;
  const newActivity = newPresence.activity;
  if (isSameActivity(oldActivity, newActivity)) return;

  const type = ['STREAMING'].find(type =>
    isLoggedActivity(oldActivity, newActivity, type)
  );
  if (!type) return;

  const { state, activity } = getActivityState(oldActivity, newActivity, type);
  const embed = new ActivityFactory(state, activity).getActivity(type);
  if (!embed) return;

  const user = [oldPresence, newPresence].filter(Boolean)[0].user;
  embed.setUser(user);

  send(newPresence.guild, embed);
};
