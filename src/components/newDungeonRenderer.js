import $ from 'jquery'

let _player

export default function Player(
  container,
  width,
  height,
  wallsetCanvas,
  jsonParsed,
  dungeonDepth,
  dungeonWidth,
  backgroundColor
) {
  _player = this

  width = parseInt(width)
  height = parseInt(height)

  this.dungeonDepth = dungeonDepth
  this.dungeonWidth = dungeonWidth
  this.backgroundColor = backgroundColor

  this.directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
  ]

  this.lastKeyDown = null
  this.imagesLoaded = null
  this.numberOfImagesToLoad = null
  this.mapSize = 16
  this.container = container
  this.width = width
  this.height = height
  this.isActive = false
  this.toggledLayers = {
    walls: new Map(),
    decals: new Map(),
    floors: new Map(),
    ceilings: new Map(),
    objects: new Map()
  }
  this.layerTogglesEnabled = false

  var generatedData = jsonParsed
  this.layers = generatedData.layers
  this.wallLayers = this.getLayersOfType(['Walls'])
  this.decalLayers = this.getLayersOfType(['Decal'])
  this.floorLayers = this.getLayersOfType(['Floor'])
  this.ceilingLayers = this.getLayersOfType(['Ceiling'])
  this.objectLayers = this.getLayersOfType(['Object'])

  this.images = this.generateImages(wallsetCanvas)
  this.player = { x: 1, y: 2, dir: 0 }
  this.map = this.generateMap()

  /* JQuery specific popup windows */
  /*
  $('#playerDialog').css('overflow', 'hidden')

  dialog = $('#playerDialog').dialog({
    autoOpen: false,
    width: this.width + 155,
    height: this.height + 170,
    modal: true,
    close: function () {
      $(document).unbind('keydown', _player.onKeyDown)
      $(document).unbind('keyup', _player.onKeyUp)
    }
  })
  */

  /* player arrow image */

  this.player_arrows = [
    $('#player_arrow_1')[0],
    $('#player_arrow_2')[0],
    $('#player_arrow_3')[0],
    $('#player_arrow_4')[0]
  ]

  /* background images */

  this.backgroundImages = [$('#background3')[0], $('#background4')[0]]

  this.backgroundIndex = 0

  /* dungeon canvas */

  //$('#playerDialog #mainCanvas').css('position', 'absolute')
  //$('#playerDialog #mainCanvas').css('left', '10px')
  //$('#playerDialog #mainCanvas').css('top', '10px')
  this.mainCanvas = $('#' + this.container + ' #mainCanvas')[0]
  this.mainCanvas.width = this.width
  this.mainCanvas.height = this.height
  this.mainCtx = this.mainCanvas.getContext('2d')
  this.mainCtx.imageSmoothingEnabled = false

  /* coords text */
  /*
  $('#coords', this.dlg).css('position', 'absolute')
  $('#coords', this.dlg).css('left', '10px')
  $('#coords', this.dlg).css('top', 10 + this.mainCanvas.height + 10 + 'px')
  */

  /* minimap canvas */
  /*
  //$('#playerDialog #minimapCanvas').css('position', 'absolute')
  //$('#playerDialog #minimapCanvas').css('left', 10 + this.mainCanvas.width + 10 + 'px')
  //$('#playerDialog #minimapCanvas').css('top', '10px')
  this.minimapCanvas = $('#' + this.container + ' #minimapCanvas')[0]
  this.minimapCanvas.width = this.mapSize * 8
  this.minimapCanvas.height = this.mapSize * 8
  this.minimapCtx = this.minimapCanvas.getContext('2d')
  this.minimapCtx.imageSmoothingEnabled = false
  */

  /* Toggle layer checkboxes */
  /*
  $('#playerDialog #objectLayersContainer').css('position', 'absolute')
  $('#playerDialog #objectLayersContainer').css('left', '10px')
  $('#playerDialog #objectLayersContainer').css('top', 10 + this.mainCanvas.height + 10 + 'px')

  $('#playerDialog #decalLayersContainer').css('position', 'absolute')
  $('#playerDialog #decalLayersContainer').css('left', '10px')
  $('#playerDialog #decalLayersContainer').css('top', 10 + this.mainCanvas.height + 30 + 'px')

  $('#playerDialog #wallLayersContainer').css('position', 'absolute')
  $('#playerDialog #wallLayersContainer').css('left', '10px')
  $('#playerDialog #wallLayersContainer').css('top', 10 + this.mainCanvas.height + 50 + 'px')

  $('#playerDialog #floorLayersContainer').css('position', 'absolute')
  $('#playerDialog #floorLayersContainer').css('left', '10px')
  $('#playerDialog #floorLayersContainer').css('top', 10 + this.mainCanvas.height + 70 + 'px')

  $('#playerDialog #ceilingLayersContainer').css('position', 'absolute')
  $('#playerDialog #ceilingLayersContainer').css('left', '10px')
  $('#playerDialog #ceilingLayersContainer').css('top', 10 + this.mainCanvas.height + 90 + 'px')

  if (this.wallLayers.length > 0) {
    $('#playerDialog #wallLayers').empty()
  }
  if (this.decalLayers.length > 0) {
    $('#playerDialog #decalLayers').empty()
  }
  if (this.objectLayers.length > 0) {
    $('#playerDialog #objectLayers').empty()
  }
  if (this.floorLayers.length > 0) {
    $('#playerDialog #floorLayers').empty()
  }
  if (this.ceilingLayers.length > 0) {
    $('#playerDialog #ceilingLayers').empty()
  }

  var that = this

  // $("#playerDialog #layers").empty();
/
  this.wallLayers.forEach((layer, i) => {
    $('#playerDialog #wallLayers').append(function () {
      return $(
        '<input layerId="' +
          layer.index +
          '" class="wallLayers" style="margin-right:5px; margin-top:2px;" tabindex="-1" checked type="checkbox" id="' +
          i +
          '">'
      ).bind('click', that.layerTogglesChanged)
    })
  })

  this.objectLayers.forEach((layer, i) => {
    $('#playerDialog #objectLayers').append(function () {
      return $(
        '<input layerId="' +
          layer.index +
          '" class="objectLayers" style="margin-right:5px; margin-top:2px;" tabindex="-1" checked type="checkbox" id="' +
          i +
          '">'
      ).bind('click', that.layerTogglesChanged)
    })
  })

  this.decalLayers.forEach((layer, i) => {
    $('#playerDialog #decalLayers').append(function () {
      return $(
        '<input layerId="' +
          layer.index +
          '" class="decalLayers" style="margin-right:5px; margin-top:2px;" tabindex="-1" checked type="checkbox" id="' +
          i +
          '">'
      ).bind('click', that.layerTogglesChanged)
    })
  })

  this.floorLayers.forEach((layer, i) => {
    $('#playerDialog #floorLayers').append(function () {
      return $(
        '<input layerId="' +
          layer.index +
          '" class="floorLayers" style="margin-right:5px; margin-top:2px;" tabindex="-1" checked type="checkbox" id="' +
          i +
          '">'
      ).bind('click', that.layerTogglesChanged)
    })
  })

  this.ceilingLayers.forEach((layer, i) => {
    $('#playerDialog #ceilingLayers').append(function () {
      return $(
        '<input layerId="' +
          layer.index +
          '" class="ceilingLayers" style="margin-right:5px; margin-top:2px;" tabindex="-1" checked type="checkbox" id="' +
          i +
          '">'
      ).bind('click', that.layerTogglesChanged)
    })
  })

  this.layerTogglesChanged()
  */
  /*
  dialog.dialog('open')
  */

  $(document).bind('keydown', this.onKeyDown)
  $(document).bind('keyup', this.onKeyUp)

  this.isActive = true
  this.render()
}

Player.prototype.onKeyDown = function (event) {
  if (_player.isActive == false) {
    return
  }

  if (_player.lastKeyDown != event.which) {
    switch (event.which) {
      case 37:
      case 103:
      case 81:
        {
          // Turn left
          _player.player.dir--
          if (_player.player.dir < 0) {
            _player.player.dir = 3
          }
          _player.render()
          _player.lastKeyDown = event.which
          event.preventDefault()
        }
        break
      case 39:
      case 105:
      case 69:
        {
          // Turn right
          _player.player.dir++
          if (_player.player.dir > 3) {
            _player.player.dir = 0
          }
          _player.render()
          _player.lastKeyDown = event.which
          event.preventDefault()
        }
        break
      case 38:
      case 104:
      case 87:
        {
          // forward
          _player.moveForward()
          _player.lastKeyDown = event.which
          event.preventDefault()
        }
        break
      case 40:
      case 101:
      case 83:
        {
          // backward
          _player.moveBackward()
          _player.lastKeyDown = event.which
          event.preventDefault()
        }
        break
    }
  }
}

Player.prototype.onKeyUp = function (event) {
  if (_player.isActive == false) {
    return
  }

  if (_player.lastKeyDown == event.which) {
    _player.lastKeyDown = null
  }
}

Player.prototype.layerTogglesChanged = function () {
  _player.toggledLayers.walls.clear()
  _player.toggledLayers.decals.clear()
  _player.toggledLayers.objects.clear()
  _player.toggledLayers.floors.clear()
  _player.toggledLayers.ceilings.clear()

  $('#playerDialog #objectLayers input').each(function () {
    _player.toggledLayers.objects.set(parseInt($(this).attr('layerId')), $(this).prop('checked'))
    $(this).blur()
  })

  $('#playerDialog #decalLayers input').each(function () {
    _player.toggledLayers.decals.set(parseInt($(this).attr('layerId')), $(this).prop('checked'))
    $(this).blur()
  })

  $('#playerDialog #wallLayers input').each(function () {
    _player.toggledLayers.walls.set(parseInt($(this).attr('layerId')), $(this).prop('checked'))
    $(this).blur()
  })

  _player.toggledLayers.floors.clear()

  $('#playerDialog #floorLayers input').each(function () {
    _player.toggledLayers.floors.set(parseInt($(this).attr('layerId')), $(this).prop('checked'))
    $(this).blur()
  })

  _player.toggledLayers.ceilings.clear()

  $('#playerDialog #ceilingLayers input').each(function () {
    _player.toggledLayers.ceilings.set(parseInt($(this).attr('layerId')), $(this).prop('checked'))
    $(this).blur()
  })

  _player.render()
}

Player.prototype.canMove = function (x, y) {
  return this.map[y][x] != 1
}

Player.prototype.moveForward = function () {
  var vector = this.directions[this.player.dir]

  if (!this.canMove(this.player.x + vector.x, this.player.y + vector.y)) {
    return
  }

  this.player.x += vector.x
  this.player.y += vector.y

  if (this.player.x < 1) {
    this.player.x = 1
  }
  if (this.player.y < 1) {
    this.player.y = 1
  }

  _player.render()
}

Player.prototype.moveBackward = function () {
  var vector = this.directions[this.player.dir]

  if (!this.canMove(this.player.x - vector.x, this.player.y - vector.y)) {
    return
  }

  this.player.x -= vector.x
  this.player.y -= vector.y

  if (this.player.x < 1) {
    this.player.x = 1
  }
  if (this.player.y < 1) {
    this.player.y = 1
  }

  _player.render()
}

Player.prototype.getLayersOfType = function (types) {
  var result = []

  this.layers.forEach((layer, layerIndex) => {
    if (layer.on && types.includes(layer.type)) {
      result.push(layer)
    }
  })

  return result
}

Player.prototype.onImageLoaded = function () {
  _player.imagesLoaded++
  if (_player.imagesLoaded >= _player.numberOfImagesToLoad) {
    _player.ready()
  }
}

Player.prototype.generateImages = function (canvas) {
  var ctx = canvas.getContext('2d')
  var result = new Map()

  this.numberOfImagesToLoad = 0

  this.layers.forEach((layer, layerIndex) => {
    this.numberOfImagesToLoad += layer.tiles.length
  })

  this.layers.forEach((layer, layerIndex) => {
    // result[layerIndex] = new Array(layer.tiles.length);
    var tilesArr = []
    layer.tiles.forEach((tile, i) => {
      var imageData = ctx.getImageData(tile.coords.x, tile.coords.y, tile.coords.w, tile.coords.h)

      var tmpCanvas = document.createElement('canvas')
      tmpCanvas.width = tile.coords.w
      tmpCanvas.height = tile.coords.h
      var tmpCtx = tmpCanvas.getContext('2d')
      if (tile.flipped) {
        var data = this.flipImage(tile.coords.w, tile.coords.h, imageData.data)
        imageData.data.set(data)
      }
      tmpCtx.putImageData(imageData, 0, 0)

      var img = new Image()
      tile.image = img

      tilesArr.push(tile)

      img.src = tmpCanvas.toDataURL('image/png')
      img.onload = this.onImageLoaded
    })

    result.set(layer.index, tilesArr)
  })

  return result
}

Player.prototype.getImage = function (index, type, x, z) {
  if (this.images.has(index)) {
    var tiles = this.images.get(index)
    for (var i = 0; i < tiles.length; i++) {
      var tile = tiles[i]
      if (tile.type == type && tile.tile.x == x && tile.tile.z == z) {
        return tile
      }
    }
  }

  return null
}

Player.prototype.ready = function () {
  this.isActive = true
  this.render()
}

Player.prototype.flipImage = function (w, h, data) {
  var flippedData = new Uint8Array(w * h * 4)

  for (let col = 0; col < w; col++) {
    for (let row = 0; row < h; row++) {
      var index = (w - 1 - col) * 4 + row * w * 4
      var index2 = col * 4 + row * w * 4
      flippedData[index2] = data[index]
      flippedData[index2 + 1] = data[index + 1]
      flippedData[index2 + 2] = data[index + 2]
      flippedData[index2 + 3] = data[index + 3]
    }
  }

  return flippedData
}

Player.prototype.cls = function () {
  var r = this.backgroundColor.r
  var g = this.backgroundColor.g
  var b = this.backgroundColor.b
  var color = 'rgb(' + r + ',' + g + ',' + b + ')'
  this.mainCtx.fillStyle = color
  this.mainCtx.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height)
}

Player.prototype.drawSides = function (z) {
  for (var x = -(this.dungeonWidth - 1); x <= this.dungeonWidth - 1; x++) {
    switch (this.player.dir) {
      case 0:
        {
          var px = this.player.x + x
          var py = this.player.y + z
        }
        break
      case 1:
        {
          var px = this.player.x - z
          var py = this.player.y + x
        }
        break
      case 2:
        {
          var px = this.player.x - x
          var py = this.player.y - z
        }
        break
      case 3:
        {
          var px = this.player.x + z
          var py = this.player.y - x
        }
        break
    }

    if (px >= 0 && py >= 0 && px < this.mapSize && py < this.mapSize) {
      if (this.map[py][px] == 1) {
        for (const layer of this.wallLayers) {
          if (this.toggledLayers.walls.get(layer.index) == true || !this.layerTogglesEnabled) {
            let result = undefined
            if ((result = this.getImage(layer.index, 'side', x, z))) {
              if (result.flipped) {
                var dx = result.screen.x - result.coords.w
                var dy = result.screen.y
                this.mainCtx.drawImage(result.image, dx, dy)
              } else {
                var dx = result.screen.x
                var dy = result.screen.y
                this.mainCtx.drawImage(result.image, dx, dy)
              }
            }
          }
        }
        for (const layer of this.decalLayers) {
          if (this.toggledLayers.decals.get(layer.index) == true || !this.layerTogglesEnabled) {
            let result = undefined
            if ((result = this.getImage(layer.index, 'side', x, z))) {
              if (result.flipped) {
                var dx = result.screen.x - result.coords.w
                var dy = result.screen.y
                this.mainCtx.drawImage(result.image, dx, dy)
              } else {
                var dx = result.screen.x
                var dy = result.screen.y
                this.mainCtx.drawImage(result.image, dx, dy)
              }
            }
          }
        }
      }
    }
  }
}

Player.prototype.drawFronts = function (z) {
  for (var x = -(this.dungeonWidth - 1); x <= this.dungeonWidth - 1; x++) {
    switch (this.player.dir) {
      case 0:
        {
          var px = this.player.x + x
          var py = this.player.y + z
        }
        break
      case 1:
        {
          var px = this.player.x - z
          var py = this.player.y + x
        }
        break
      case 2:
        {
          var px = this.player.x - x
          var py = this.player.y - z
        }
        break
      case 3:
        {
          var px = this.player.x + z
          var py = this.player.y - x
        }
        break
    }

    if (px >= 0 && py >= 0 && px < this.mapSize && py < this.mapSize) {
      if (this.map[py][px] == 1) {
        for (const layer of this.wallLayers) {
          if (this.toggledLayers.walls.get(layer.index) == true || !this.layerTogglesEnabled) {
            let result = undefined
            if ((result = this.getImage(layer.index, 'front', 0, z))) {
              var dx = result.screen.x + x * result.coords.fullWidth
              var dy = result.screen.y
              this.mainCtx.drawImage(result.image, dx, dy)
            }
          }
        }
        for (const layer of this.decalLayers) {
          if (this.toggledLayers.decals.get(layer.index) == true || !this.layerTogglesEnabled) {
            let result = undefined
            if ((result = this.getImage(layer.index, 'front', 0, z))) {
              var dx = result.screen.x + x * result.coords.fullWidth
              var dy = result.screen.y
              this.mainCtx.drawImage(result.image, dx, dy)
            }
          }
        }
      }

      if (this.map[py][px] == 2) {
        for (const layer of this.objectLayers) {
          if (this.toggledLayers.objects.get(layer.index) == true || !this.layerTogglesEnabled) {
            let result = undefined
            if ((result = this.getImage(layer.index, 'object', 0, z))) {
              var dx = result.screen.x + x * result.coords.fullWidth
              var dy = result.screen.y
              this.mainCtx.drawImage(result.image, dx, dy)
            }
          }
        }
      }
    }
  }
}

Player.prototype.drawFloor = function (z) {
  for (var x = -(this.dungeonWidth - 1); x <= this.dungeonWidth - 1; x++) {
    switch (this.player.dir) {
      case 0:
        {
          var px = this.player.x + x
          var py = this.player.y + z
        }
        break
      case 1:
        {
          var px = this.player.x - z
          var py = this.player.y + x
        }
        break
      case 2:
        {
          var px = this.player.x - x
          var py = this.player.y - z
        }
        break
      case 3:
        {
          var px = this.player.x + z
          var py = this.player.y - x
        }
        break
    }

    if (px >= 0 && py >= 0 && px < this.mapSize && py < this.mapSize) {
      for (const layer of this.floorLayers) {
        if (this.toggledLayers.floors.get(layer.index) == true || !this.layerTogglesEnabled) {
          let result = undefined
          if ((result = this.getImage(layer.index, 'floor', x, z))) {
            if (result.flipped) {
              var dx = result.screen.x - result.coords.w
              var dy = result.screen.y
              this.mainCtx.drawImage(result.image, dx, dy)
            } else {
              var dx = result.screen.x
              var dy = result.screen.y
              this.mainCtx.drawImage(result.image, dx, dy)
            }
          }
        }
      }
    }
  }
}

Player.prototype.drawCeiling = function (z) {
  for (var x = -(this.dungeonWidth - 1); x <= this.dungeonWidth - 1; x++) {
    switch (this.player.dir) {
      case 0:
        {
          var px = this.player.x + x
          var py = this.player.y + z
        }
        break
      case 1:
        {
          var px = this.player.x - z
          var py = this.player.y + x
        }
        break
      case 2:
        {
          var px = this.player.x - x
          var py = this.player.y - z
        }
        break
      case 3:
        {
          var px = this.player.x + z
          var py = this.player.y - x
        }
        break
    }

    if (px >= 0 && py >= 0 && px < this.mapSize && py < this.mapSize) {
      for (const layer of this.ceilingLayers) {
        if (this.toggledLayers.ceilings.get(layer.index) == true || !this.layerTogglesEnabled) {
          let result = undefined
          if ((result = this.getImage(layer.index, 'ceiling', x, z))) {
            if (result.flipped) {
              var dx = result.screen.x - result.coords.w
              var dy = result.screen.y
              this.mainCtx.drawImage(result.image, dx, dy)
            } else {
              var dx = result.screen.x
              var dy = result.screen.y
              this.mainCtx.drawImage(result.image, dx, dy)
            }
          }
        }
      }
    }
  }
}

Player.prototype.render = function () {
  if (!this.isActive) {
    return
  }

  $('#' + this.container + ' #coords').html(this.player.x + ':' + this.player.y)

  this.cls()

  // draw ceiling

  for (var z = -this.dungeonDepth; z <= 0; z++) {
    this.drawCeiling(z)
  }

  // draw floor

  for (var z = -this.dungeonDepth; z <= 0; z++) {
    this.drawFloor(z)
  }

  // draw wall, decal and object layers

  for (var z = -this.dungeonDepth; z <= 0; z++) {
    this.drawSides(z)
    this.drawFronts(z)
  }

  // minimap
  if (this.minimapCanvas !== undefined) {
    var squareSize = 8

    this.minimapCtx.fillStyle = 'black'
    this.minimapCtx.fillRect(0, 0, this.minimapCanvas.width, this.minimapCanvas.height)

    this.map.forEach((row, j) => {
      row.forEach((square, i) => {
        if (square == 1) {
          this.minimapCtx.fillStyle = '#999999'
          var x = i * squareSize
          var y = j * squareSize
          this.minimapCtx.fillRect(x, y, squareSize, squareSize)
        }
        if (square == 2) {
          this.minimapCtx.fillStyle = '#336699'
          var x = i * squareSize
          var y = j * squareSize
          this.minimapCtx.fillRect(x, y, squareSize, squareSize)
        }
      })
    })

    // draw player icon

    this.minimapCtx.fillStyle = 'green'
    var x = this.player.x * squareSize
    var y = this.player.y * squareSize
    this.minimapCtx.drawImage(this.player_arrows[this.player.dir], x, y)
  }
}

Player.prototype.generateMap = function () {
  var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]

  return map
}
