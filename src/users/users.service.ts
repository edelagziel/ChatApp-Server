import { Injectable } from '@nestjs/common';
import { filter } from 'rxjs';
import { CreateuserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
private users = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "Sincere@april.biz",
      "role": "INTERN",
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "Shanna@melissa.tv",
      "role": "INTERN",
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "Nathan@yesenia.net",
      "role": "ENGINEER",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "Julianne.OConner@kory.org",
      "role": "ENGINEER",
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "Lucio_Hettinger@annie.ca",
      "role": "ADMIN",
    }
  ];

  findAll(role?: 'INTERN'|'ENGINEER'|'ADMIN')
  {
    if(role)
    {
      return this.users.filter((user)=> user.role===role )
    }

    return this.users;
  }

  Findone(id:number)
  {
    const user = this.users.find((user)=> user.id===id)
    return user;
  }

  create(createuserDto:CreateuserDto)
  {
    const userByHigestId=[...this.users].sort((a,b)=>b.id-a.id);
    const newUser={
      id: userByHigestId[0].id+1,
      ...createuserDto
    };
    this.users.push(newUser)
    return newUser;
  }

  update(id:number, updateUserDto:UpdateUserDto)
  {
      this.users= this.users.map((user)=>{
      if(user.id===id)
      {
        return {...user , ...updateUserDto};
      }
      return user;
    })

    return this.Findone(id);
  }


  delete(id:number)
  {
    const RemoveUsers= this.Findone(id);
    this.users= this.users.filter((user)=>{return user.id!==id})

    return RemoveUsers;


  }

}
