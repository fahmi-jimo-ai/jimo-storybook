/jimo-add-component about these different components for "Experience Cards"


This component will display an experience information in jimo dashboards.

![alt text](image-4.png)

1. Live Status (green “Live” pill at the top)

https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3122-3517&t=Ef24UzyBoZTdAr6m-11

This element communicates the current lifecycle state of the experience.
When it’s “Live” (with a green indicator), it tells the user:

- This experience is currently active and can be shown to end‑users.

- Any changes to its configuration may affect real users.

- It’s shown differently on different status from the figma design link


2. Tags (Tag 1, Tag 2, Tag 3,etc)

https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=3122-3644&t=Ef24UzyBoZTdAr6m-11

Tags communicate categorization and filtering context.

- Each tag represents a facet such as product area, goal (onboarding, activation, retention), audience type, or experiment type that jimo customers can easily add/remove

- For users scanning a list, tags help them group related experiences and quickly filter mentally (or via UI filters).


Figma for 3 & 4: https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji?node-id=1240-6718&t=Ef24UzyBoZTdAr6m-11

3. Experience Thumbnail

This show the experience design in a glance, in ideal case scenario the item rendered inside the thumbnail is an iframe, but in figma i rendered it as png, you should accomodate the iframe case in your dev.

4. Metadata Row (Card Title · Created X days ago · All users · All Environments)

This row communicates the experience name and its other props.

- Card Title: Often a more system‑oriented or internal name for the experience/card itself

- Created 5 days ago: Age of the experience; helps users see what’s new vs. old and reason about recency.

- All users: who this experience is targeting.

- All Environments: The environment scope (e.g. staging, production, sandbox).
