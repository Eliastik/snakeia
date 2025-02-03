
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
import SnakeAILow from "./SnakeAILow.js";
import SnakeAINormal from "./SnakeAINormal.js";

export default class SnakeAIHigh extends SnakeAINormal {
  constructor(snake) {
    super(true);
    this.aiLow = new SnakeAILow(snake);
    this._aiLevelText = "high";
  }

  ai(snake) {
    const res = super.ai(snake);

    if(!res) {
      return this.aiLow.ai(snake);
    }
    
    return res;
  }
}