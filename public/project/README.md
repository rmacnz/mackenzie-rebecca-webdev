Working with: Nobody

Project description:
I will be making a staff website for CS2500 (Fundamentals of Computer Science I). I am the coordinator for this course and have often wished that there was a site where I could do everything I needed to in one place.
One thing you will be able to do on the site is leave a review for a staff member. The course frequently has over 30 staff members (tutors and TAs) and we need a system to allow students to leave feedback so that we make sure to hire the best possible staff for the course each semester. Anyone can view the reviews and search through the staff members but the reviews will be shown anonymously to protect the identities of students who write unpleasant reviews. If you are logged in you should be able to see which reviews you have written.
Another thing you can do is to apply for a position as a staff member. As I mentioned we frequently hire many staff members and one problem we have is figuring out an efficient way to schedule the interviews. The site will allow you to request an interview for two or more days in the future so that there is time for me to provide the preparatory materials and confirm the interview before the student arrives in my office. I am hoping to also have a way to notify the student of acceptance/denial after the interview process but this may be beyond the scope of this course.
As a staff member of the course you will have more options when you log in. You will be able to schedule/reschedule your office hours and labs as well as provide notice if you are unavailable for some reason one week and notify me if you would like to work for the course again in a future semester. However, staff members can also do all the things that students can although they cannot write a review of themselves since this would be unnecessary.
If you are not logged in you will be able to create an account, view the reviews, and view the office hours schedule since these are things students may want to do even without logging into the site.
In order to create this website I will make use of the Google Calendar API

Potential domain objects:
1. Semester
  Relation to other domain objects: Every event has a semester (office hours, lab, interview) which it is scheduled for, a staff member works during a given semester(s)
2. Staff (Tutor, TA)
  Relation to other domain objects: A staff member is assigned to the course for some semester(s), a staff member has office hours, a staff member has a lab
3. Event (Office Hours, Lab, Interview)
  Relation to other domain objects: An office hours slot has a staff member, a lab has several staff members in it, an interview is for a given semester, etc.

Potential human users:
1. Course Coordinator
   Potential goals: review information about staff in order to decide on staff for future semesters, find out who worked for the course in previous semesters so that I can contact them to ask if they are interested in working for the course again, schedule interviews with potential tutors/TAs
   User relations: The coordinator is the supervisor for tutors and TAs
   Domain object relations: The coordinator is an admin user and is therefore able to accept/deny interview requests, and accept/deny scheduling of office hours and labs by the staff members
2. Student in the course
   Potential goals: find out when office hours are being held, find out who the head TA for your lab is, leave a review of a staff member (tutor or TA), apply for a position as a tutor for the course
   User relations: a student can leave a review of a staff member, a student is in a lab section which has a head TA
   Domain object relations: a student can leave a review, a student can schedule an interview
3. Staff member in the course
   Potential goals: view reviews of your work and see how you can improve in the future, find out if someone can cover your office hours if you cannot make them for some reason, notify the coordinator that you would like to work for the course again in a future semester
   User relations: a staff member has reviews left by students, a TA has a lab which students are in
   Domain object relations: A staff member has office hours, a staff member has a lab, a staff member may have many reviews



