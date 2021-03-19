import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  car:Car;
  startDate:Date;
  endDate:Date;
  rentPrice:number = 0;
  rental:Rental;
  rentable:Boolean = false;
  constructor(
    private rentalService:RentalService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
      }
    })
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
    });
  }

  addRental(){
    if(this.rentable){
      this.rental = this.rental;
      console.log(this.rental)
      this.router.navigate(['/creditcard/', JSON.stringify(this.rental)]);
      this.toastrService.info("Kredi kartı ödeme sayfasına yönlendiriliyor","Yönlendiriliyor")
    }else{
      this.toastrService.error("Bu tarihler arasında arabayı kiralayamazsınız","Zaten kiralanmış")
    }
  }

  setRentable(){
    this.rentalService.isRentable(this.rental).subscribe(response=>{
      this.rentable = response.success
    })
  }

  calculatePrice(){
    if(this.startDate && this.endDate){
      let endDate = new Date(this.endDate.toString())
      let startDate = new Date(this.startDate.toString())
      let endDay = Number.parseInt(endDate.getDate().toString())
      let endMonth = Number.parseInt(endDate.getMonth().toString())
      let endYear = Number.parseInt(endDate.getFullYear().toString())
      let startDay = Number.parseInt(startDate.getDate().toString())
      let startMonth = Number.parseInt(startDate.getMonth().toString())
      let startYear = Number.parseInt(startDate.getFullYear().toString())
      let result =  ((endDay - startDay) + ((endMonth - startMonth)*30) + ((endYear - startYear)*365) + 1) * this.car.dailyPrice
      if (result>0){
        this.rental = {carId:this.car.carId,rentStartDate:this.startDate,rentEndDate:this.endDate,totalRentPrice:result};
        console.log(result)
        this.rentPrice = result
        this.setRentable()
      }else{
        this.rentPrice = 0
        this.toastrService.info("Bu tarihler arasında arabayı kiralayamazsınız","!")
      }
    }
    else{
      this.rentPrice = 0
      this.toastrService.info("Bu tarihler arasında arabayı kiralayamazsınız","!")
    }
  }


  // createRental(){
  //   let MyRental:Rental = {
  //     rentDate: this.rentDate,
  //     returnDate: this.returnDate,
  //     carId: this.car.carId,
  //     customerId: parseInt(this.customerId.toString())
  //   }
  //   this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
  //   this.toastr.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri");
  //   /*
  //   this.rentalService.rentalCar(MyRental).subscribe(response => {
  //     this.toastr.success(response.message.toString(), "Harika...");
  //   })
  //   */
  // }
}