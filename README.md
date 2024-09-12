
<h1 align="center">Planning Poker App</h1>

Agile/Scrum Planning Poker Web App to estimate user stories for the Agile/Scrum teams. Create session and invite team members to estimate user stories efficiently. Intuitive UI/UX for voting the story points, showing team members voting status with emojis(👍 - Voting Done, 🤔 - Yet to Vote). Session Moderator has full control on revealing story points and restarting the session.

<div align="center">
  
[![Build and Tests]](https://github.com/ablascobraso/scrumbro/actions)
[![Deploy to Firebase]](https://github.com/ablascobraso/scrumbro/actions)

</div>

## Existing Features

1. Create new Session(Fibonacci or TShirt size)
2. Join Session
3. Invite Link
4. Session controller - Moderator can Reveal and restart the session anytime.
5. Reveal - Reveal the cards for all users
6. Voting status - Users Cards show voting status using emojis - 👍 - Voting Done, 🤔 - Yet to Vote
7. Remove user from session
8. Delete Session - Moderator can delete the session completely.
9. Timer

## Tech Stack

1. React - Frontend
2. Material-ui - UI Components
3. Firestore - Database
4. Firebase - Hosting

## How to run the app locally for development

1. Clone the repo

    ```bash
    git clone https://github.com/ablascobraso/scrumbro.git
    ```

2. Run `yarn` command to install the required npm package.
3. Run `yarn start` to start the app.
4. Access the app at `http://localhost:3000`.
5. We use the same production database for local development too, so avoid creating too many new sessions and re-use existing one.

## Pending features open to development

1. Add moderator checkbox, to grant moderator privileges to normal users.
2. Export options
3. Preserve history of voting and show it in session
4. Provide option to enter user story name (list of issues estimated and to be estimated)
5. Fix bug when timer is 0 and you invite a new player
6. Confetti animation is only appearing for moderator
7. Add login page SSO
8. Add flag to languages selector
9. Rename it to scrum agile (I think it is a better name than scrumbro)
10. Complete footer
11. Improve UI design
12. Currently, this project can also be installed as a desktop application, is this a necessary feature?
13. Add dark theme


## Tech Depts

1. Add Semantic Release to generate changelog and release notes
2. Add missing unit tests for services
3. Upgrade Material UI to latest version
4. Add Stripe or useful google firebase extensions
5. Fix security issues raised by GitHub
6. Update firebase rules, now it is just allowing any write


[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/scrumbro)
