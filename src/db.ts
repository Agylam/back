import {open} from 'sqlite'
import sqlite3 from 'sqlite3'
export class Database{
  fileName : string;
  constructor(fileName:string) {
    this.fileName = fileName;
  }
  private async open(fileName:string,onError:(error:any)=>void){
    try{
      const db = await open({
        filename: fileName,
        driver: sqlite3.Database
      })
      return db;
    }catch (e:any){
      onError(e);
    }
  }


  async query<T>(sql:string,params:string[]){
    return new Promise<Awaited<T> | undefined>(async (resolve, reject)=>{
      const db = await this.open(this.fileName,(error:any)=>{
        reject(error);
        return;
      });
      if(db == null) return;
      const result = await db.get<T>(sql,params);
      await db.close()
      resolve(result);
    })
  }
  async queryAll<T>(sql:string,params:string[]){
    return new Promise<Awaited<T> | undefined>(async (resolve, reject)=>{
      const db = await this.open(this.fileName,(error:any)=>{
        reject(error);
        return;
      });
      if(db == null) return;
      const result = await db.all<T>(sql,params);
      await db.close()
      resolve(result);
    })
  }
}