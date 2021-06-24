import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as $ from 'jquery';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    heyy = 'opacity';
    x: boolean = true;
    yAnimation: any = 0;
    xAnimation: any = 0;
    value_fb: any = 0;
    // xCoord: any;
    // yCoord: any;
    oldVal: any = {
        'x': 70,
        'y': 30
    };
    loctionDict = {
        "0": {
            "x": 10,
            "y": 200
        },
        "1": {
            "x": 75,
            "y": 200
        },
        "2": {
            "x": 70,
            "y": 30
        },
        "3": {
            "x": 135,
            "y": 100
        },
        "4": {
            "x": 135,
            "y": 290
        },
        "5": {
            "x": 135,
            "y": 390
        },
        "6": {
            "x": 135,
            "y": 480
        },
        "7": {
            "x": 55,
            "y": 350
        },
    };

    constructor(private db: AngularFireDatabase) {

    }
    ngOnInit() {
        this.getBookingList();

    }
    getBookingList() {
        console.log('yarab');
        this.db.object('yarab-3b871/sensor/-MKaY6oKjFd52XqSekLS/RollNo').valueChanges().subscribe(
            data => {
                console.log(typeof data, data);

                this.yAnimation = document.getElementById('moveY');
                this.yAnimation.beginElement();
                this.xAnimation = document.getElementById('moveX');
                this.xAnimation.beginElement();

                this.value_fb = data.toString();
                this.getLocation();

                // this.testText("yAnimation", "0", "0", "65", "0");
                // this.testText("Yanimation", "0", "30", "0", "70");
                // this.testText("yAnimation", "0", "0", "0", "120");


            }

        )
    }
    getLocation() {
        // console.log(this.value_fb);
        // console.log("y=", this.loctionDict["0"]['y']);
        // console.log(n)
        if (this.oldVal['x'] === 135 && this.loctionDict[this.value_fb]['x'] === 135) {
            $('#moveY').attr(
                {

                    "from": this.oldVal["y"],
                    "to": this.loctionDict[this.value_fb]["y"]
                });
            console.log("A");
            console.log(document.getElementById('moveY').getAttribute("from")
                , document.getElementById('moveY').getAttribute("to")
            )
        }
        else {
            console.log("old_Xvalue", this.oldVal["x"]);
            document.getElementById('moveX').setAttribute("from", this.oldVal["x"]);
            document.getElementById('moveX').setAttribute("to", "135");
            //      document.getElementById('moveX').setAttribute("animation-delay", '10s');
            console.log("B");
            document.getElementById('moveY').setAttribute("from", this.oldVal["y"]);
            document.getElementById('moveY').setAttribute("to", this.loctionDict[this.value_fb]["y"]);
            setTimeout(() => {
                document.getElementById('moveX').setAttribute("from", "135");
                document.getElementById('moveX').setAttribute("to", this.loctionDict[this.value_fb]["x"]);

            }, 3000);
        }
        setTimeout(() => {
            this.oldVal['x'] = this.loctionDict[this.value_fb]["x"];
            this.oldVal['y'] = this.loctionDict[this.value_fb]["y"];
            console.log(this.loctionDict[this.value_fb]['x'], this.oldVal["x"]);

        }, 3000);



    }

    // this.xCoord = this.loctionDict[this.value_fb]['x'];
    // this.yCoord = this.loctionDict[this.value_fb]['y'];
    // console.log(this.xCoord);
    // document.getElementById('chk').setAttribute("x", this.xCoord.toString());
    // document.getElementById('chk').setAttribute("y", this.yCoord.toString());
    // this.oldVal.x = this.loctionDict[this.value_fb]['x'];
    // console.log(this.oldVal.x);
    // this.oldVal.y = this.loctionDict[this.value_fb]['y'];


    sketch() {
        document.getElementById('chk').style.transform = 'translateY(20px)';
        // document.getElementById('chk').setAttribute("x", this.oldVal["x"].toString());
        // document.getElementById('chk').setAttribute("y", this.oldVal["y"].toString());
    }
    testText(whichAnim, x1, y1, x2, y2) {

        var result = "M " + x1 + " " + y1 + " " + "L " + x2 + " " + y2;
        console.log(result);
        document.getElementById(whichAnim).setAttribute("path", result);
    }


}
