
import { Component,OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

import { UserService } from '../../services/user.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./schedule.component.css'],
  templateUrl: './schedule.component.html'
})

export class ScheduleComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  scheduleDate : any;
  startTime : any;
  endTime : any;
  description : string;
  user : string;

  schedule: any = [];
  viewDate: Date = new Date();

  modalData: {
    action: string,
    event: CalendarEvent
  };

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.handleEvent('Edited', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.handleEvent('Deleted', event);
    }
  }];

  refresh: Subject<any> = new Subject();

  events: any = [];

  activeDayIsOpen: boolean = true;
  users: any = [];
  schedules: any = [];
  constructor(private userService: UserService,private modal: NgbModal,public toastr: ToastsManager) {

    console.log("event",this.events);
    console.log("user",this.users);

  }

  increment(): void {

    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    this.viewDate = addFn(this.viewDate, 1);

  }

  decrement(): void {

    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];

    this.viewDate = subFn(this.viewDate, 1);

  }

  today(): void {
    this.viewDate = new Date();
  }



  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    console.log(date);
    this.scheduleDate = date;
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }


  detailEvent : any = {};
  taskID : any;
  handleEvent(action: string, event: any): void {


     this.taskID = event.scheduleID;
     this.detailEvent = {
       startTime : event.start,
       endTime : event.end,
       description: event.title,
       user : event.user.firstName + " " + event.user.lastName,
       userRole : event.user.role

     };
    console.log("detail", this.detailEvent);



  }


  deleteSchedule(){


    this.userService.deleteSchedule(this.taskID)
      .subscribe(
        data => {


        this.toastr.success('Schedule Successfully deleted', 'Success!');
        //this.users.splice(this.index,1);
          this.events = [];
          this.filterByUser = null;
          this.userService.getAllSchedules().subscribe(schedules => {
            console.log("data in schedules",schedules.data );


            for(var i=0;i <schedules.data.length;i++){





              var year = schedules.data[i].scheduleYear;
              var month = schedules.data[i].scheduleMonth;
              var day = schedules.data[i].scheduleDay;




              var startTime = schedules.data[i].startTime.split(":");

              var endTime = schedules.data[i].endTime.split(":");

              var scheduleID = schedules.data[i]._id;

              var description = schedules.data[i].description;


              let start = new Date(year,month,day,startTime[0],startTime[1],0);
              let end = new Date(year,month,day,endTime[0],endTime[1],0);


              let user = schedules.data[i].user;


              this.events.push({

                title : description,
                start: start,
                end : end,
                color: colors.blue,
                draggable: false,
                scheduleID : scheduleID,
                user :user
              });


              this.refresh.next();
            }


            console.log("final",this.events);
          },error => { console.log('Error');  });


        console.log('data',data);

      },
        error => {
        let err = error.json();
        console.log('Error',err);
        this.toastr.error('Error in Deletion!', 'Error!');
      });

  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  startTimeString: any;
  endTimeString: any;







  addSchedule(){

    if(this.scheduleDate){


      if(this.startTime > this.endTime){

        this.toastr.error("Choose valid start & end time.", 'Dates Error!');
        console.log("stop");
        return false;
      }


      console.log("Only Hours",this.startTime.getHours());
      this.startTimeString = this.startTime.getHours() + ":" + this.startTime.getMinutes() + ":" + this.startTime.getSeconds() ;
      this.endTimeString = this.endTime.getHours() + ":" + this.endTime.getMinutes()  + ":" +  this.endTime.getSeconds();
      let month = this.scheduleDate.getMonth();
      let date = this.scheduleDate.getDate();
      let year = this.scheduleDate.getFullYear();

      let eventObj = {
        scheduleDate : this.scheduleDate,
        startTime : this.startTimeString,
        endTime : this.endTimeString,
        description : this.description,
        user : this.user,
        scheduleDay : date,
        scheduleMonth :month,
        scheduleYear :year

      };

      console.log("event Object",eventObj);
      this.userService.addSchedule(eventObj)
        .subscribe(
          data => {

          console.log('data',data);
            this.toastr.success(data.message, 'Success!');

          let year = data.data.scheduleYear;
          let month = data.data.scheduleMonth;
          let day = data.data.scheduleDay;




          let startTime = data.data.startTime.split(":");

          let endTime = data.data.endTime.split(":");

          let scheduleID = data.data._id;

          let description = data.data.description;


          let start = new Date(year,month,day,startTime[0],startTime[1],0);
          let end = new Date(year,month,day,endTime[0],endTime[1],0);

          let user = data.data.user;


          this.events.push({

            title : description,
            start: start,
            end : end,
            color: colors.blue,
            draggable: false,
            scheduleID:scheduleID,
            user: user
          });

          this.refresh.next();




        },
          error => {
          let err = error.json();
          console.log('Error',err);

            this.toastr.success(err.data, 'Error In adding schedule!');

        });
    }

    else{

      this.errorMessage= "Please choose date from calendar"
    }



  }

  errorMessage: string;
  filterByUser: string;


  getscheduleforUser(){

    console.log("filter by id", this.filterByUser);

    if(this.filterByUser){

      this.userService.getSchedulesForUser(this.filterByUser)
        .subscribe(
          schedules => {

            this.events = [];
            console.log('return data for filter',schedules);
            for(var i=0;i <schedules.data.length;i++){





              var year = schedules.data[i].scheduleYear;
              var month = schedules.data[i].scheduleMonth;
              var day = schedules.data[i].scheduleDay;




              var startTime = schedules.data[i].startTime.split(":");

              var endTime = schedules.data[i].endTime.split(":");

              var scheduleID = schedules.data[i]._id;

              var description = schedules.data[i].description;


              let start = new Date(year,month,day,startTime[0],startTime[1],0);
              let end = new Date(year,month,day,endTime[0],endTime[1],0);

              let user = schedules.data[i].user;

              this.events.push({

                title : description,
                start: start,
                end : end,
                color: colors.blue,
                draggable: false,
                scheduleID : scheduleID,
                user : user
              });


              this.refresh.next();
            }

        },
          error => {
          let err = error.json();
          console.log('Error',err);


        });

    }

  }

  ngOnInit() {

    this.userService.getAllUsers().subscribe(users => {
      console.log("data in component",users.data );
      this.users = users.data;
      console.log(this.users);
    },error => { console.log('Error');  });

    this.userService.getAllSchedules().subscribe(schedules => {
      console.log("data in schedules",schedules.data );


      for(var i=0;i <schedules.data.length;i++){





        var year = schedules.data[i].scheduleYear;
        var month = schedules.data[i].scheduleMonth;
        var day = schedules.data[i].scheduleDay;




        var startTime = schedules.data[i].startTime.split(":");

        var endTime = schedules.data[i].endTime.split(":");

        var scheduleID = schedules.data[i]._id;

        var description = schedules.data[i].description;


        let start = new Date(year,month,day,startTime[0],startTime[1],0);
        let end = new Date(year,month,day,endTime[0],endTime[1],0);


        let user = schedules.data[i].user;

        //let userSchedule ={
        //
        //  title : "Schedule",
        //  type : "Info",
        //  scheduleID : scheduleID,
        //  start: start,
        //  end : end,
        //  color: colors.red,
        //};

        //this.schedules.push(userSchedule);
        this.events.push({

          title : description,
          start: start,
          end : end,
          color: colors.blue,
          draggable: false,
          scheduleID : scheduleID,
          user :user
        });


        this.refresh.next();
      }


      console.log("final",this.events);
    },error => { console.log('Error');  });
  }
}
