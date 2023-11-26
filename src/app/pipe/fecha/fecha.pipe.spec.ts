import { FechaPipe } from './fecha.pipe';

describe('FechaPipe', () => {
  it('create an instance', () => {
    const pipe = new FechaPipe();
    expect(pipe).toBeTruthy();
  });
  it('castfecha', () => {
    const pipe = new FechaPipe();
    const fecha = new Date();

    let d = fecha.getDate().toString().padStart(2,"0")
    let m = (fecha.getMonth()+1).toString().padStart(2,"0")
    let a = fecha.getFullYear();
    let h = fecha.getHours().toString().padStart(2,"0");
    let min = fecha.getMinutes().toString().padStart(2,"0");
    let s = fecha.getSeconds().toString().padStart(2,"0");
    let valor = `${a}-${m}-${d}T${h}:${min}:${s}.000Z`;
    console.log(valor);
    expect(valor).toBeTruthy();
  });
});
