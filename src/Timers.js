/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */
class Timer {
  constructor(callback, delay, timerInterval) {
    this.callback = callback;
    this.delay = delay;
    this.timerInterval = timerInterval;

    this.remaining = delay;
    this.timerId;
    this.start;
  }

  pause() {
    clearTimeout(this.timerId);
    this.timerInterval != null && this.timerInterval.stop != null && this.timerInterval.stop();
    this.remaining -= Date.now() - this.start;
  }

  resume() {
    this.start = Date.now();
    clearTimeout(this.timerId);
    this.timerInterval != null && this.timerInterval.stop != null && this.timerInterval.stop();
    this.timerId = setTimeout(this.callback, this.remaining);
    this.timerInterval != null && this.timerInterval.start != null && this.timerInterval.start();
  }

  reset() {
    clearTimeout(this.timerId);
    this.timerInterval != null && this.timerInterval.stop != null && this.timerInterval.stop();
    this.remaining = this.delay;
  }

  getTime() {
    return this.remaining - (Date.now() - this.start);
  }
}

class TimerInterval {
  constructor(callback) {
    this.callback = callback;
    this.interval;
  }

  start() {
    this.interval = setInterval(this.callback, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}

export { Timer, TimerInterval };