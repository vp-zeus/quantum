
// types
type Card = {
  title: string;
  img: string;
  favourite: boolean;
  about: {
    subject: string;
    grade: number;
  };
  metrics?: {
    units: number;
    lessons: number;
    topics: number;
  };
  classDetails?: {
    name: string;
    numberOfStudents: number;
    durationDate?: string;
  };
};

type Announcement = {
  name: string;
  msg: string;
  timeStamp: string;
  filesAttached?: number;
  courseName?: string;
};

type NotificationAlert = {
  msg:string;
  timeStamp:string;
  courseName?:string;
  className?:string;
}

// Data


let announcements:Announcement[] = []
let notifications:NotificationAlert[] = []
let cardData:Card[] = []


const navLinks = ["Dashboard", "Content", "Users", "Reports", "Admin"];

// Elements
const cardContainer = document.querySelector(".card-container");
const navLinksContainer = document.querySelector(".nav-links");
const hamburgerMenuContainer = document.querySelector("#navigation-menu");
const links = navLinksContainer.getElementsByTagName("li");

const announcementList = document.getElementById("announcement")
const announcementBadge = document.getElementById("announcement-badge")

const notificationList = document.getElementById("notification")
const notificationBadge = document.getElementById("notification-badge")
// Render

const buildAnnouncements = async() => {
  const response = await fetch('../json/announcements.json');
  announcements = await response.json();
  announcementBadge.innerText = announcements.length.toString()
  announcements.forEach((announcement) => {
    const { name, msg, courseName, filesAttached } = announcement;
    const li = `<li>
    ${
      name
        ?
         `<p class="announcement--name">
            <span>PA: </span>
            <span>${name}</span>
          </p>`
        : ""
    }
    
    <p class="announcement--msg">${msg}</p>
    ${
      courseName 
        ? 
          `<p>
            <span>Course: </span>
            <span>${courseName}</span>
          </p>`
          : ""
    }
    <p class="announcement--details">
      ${
        filesAttached ? `<span>${filesAttached} files are attached</span>` : ""
      }
      
      <span>15-Sep-2018 at 07:21pm</span>
    </p>
  </li>`;
    announcementList.insertAdjacentHTML("beforeend", li);
  });
}

const buildNotifications = async() => {
  const response = await fetch('../json/notifications.json');
  notifications = await response.json();
  notificationBadge.innerText = notifications.length.toString()
  notifications.forEach((notification) => {
    const { msg, courseName} = notification;
    const li = `<li>
    
    <p class="announcement--msg">${msg}</p>
    ${
      courseName 
        ? 
          `<p>
            <span>Course: </span>
            <span>${courseName}</span>
          </p>`
          : ""
    }
    <p class="announcement--details">
      <span>15-Sep-2018 at 07:21pm</span>
    </p>
  </li>`;
    notificationList.insertAdjacentHTML("beforeend", li);
  });
}

const buildCourses = async() => {
  const response = await fetch('../json/courses.json');
  cardData = await response.json();
  cardData.forEach((data) => {
    const {
      title,
      img,
      favourite,
      about: { subject, grade },
      metrics,
      classDetails,
    } = data;
    const card = document.createElement("div");
    card.classList.add("card");
    const cardContent = `
      <div class="card-content flex gap-10 mb-3">
        <img class="thumbnail"  src="${img}" alt="">
          <div>
            <div class="flex justify-between">
              <span  class="title-text text-2xl">${title}</span>
              ${favourite ? '<img src="/assets/icons/favourite.svg" alt="">' : ""}
              
            </div>
            <div class="text-sm text-slate-600">
              <span>${subject} |</span>
              <span>Grade ${grade}</span>
            </div>
            <div class="flex gap-4 text-sm text-slate-600">
              ${
                metrics
                  ? `<span>
                <b>${metrics.units}</b>
                Units
              </span>
              <span>
                <b>${metrics.lessons}</b>
                Lessons
              </span>
              <span>
                <b>${metrics.topics}</b>
                Topics
              </span>`
                  : ""
              }
            </div>
            ${
              classDetails
                ? `<select name="" id="" >
              <option value="${classDetails.name}">${classDetails.name}</option>
            </select>
            <div class="text-sm text-slate-500 mt-2">
              <span>${classDetails.numberOfStudents} students  |</span>
              ${
                classDetails.durationDate
                  ? `${classDetails.durationDate}</span>`
                  : ""
              }
            </div>`
                : `<select name="" id="" >
            <option value="classb">No Classes</option>
          </select>`
            }
          </div>
      </div>
      <hr/>
      <div class="flex justify-between p-5">
        <img src="/assets/icons/preview.svg" alt="">
        <img src="/assets/icons/manage course.svg" alt="">
        <img src="/assets/icons/grade submissions.svg" alt="">
        <img src="/assets/icons/reports.svg" alt="">
      </div>`;
  
    card.insertAdjacentHTML("beforeend", cardContent);
    cardContainer.appendChild(card);
  });
}





const buildPage = () => {
  navLinks.forEach((text, index) => {
    const li = document.createElement("li");
    li.textContent = text;
    li.id = index.toString();
  
    li.addEventListener("click", (e) => {
      const id = (e.target as HTMLLIElement).id;
  
      for (let item of links) {
        if (item.id === id) item.classList.add("active-link");
        else item.classList.remove("active-link");
      }
    });
  
    if (index === 0) li.classList.add("active-link");
    navLinksContainer.appendChild(li);
  });
  
  navLinks.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    hamburgerMenuContainer.appendChild(li);
  });
  buildAnnouncements()
  buildNotifications()
  buildCourses()

}

buildPage()






