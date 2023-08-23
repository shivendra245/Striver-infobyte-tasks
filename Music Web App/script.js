document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const seekSlider = document.getElementById("seekSlider");
    const songList = document.getElementById("songList");

    let currentSongIndex = 0;
    let isPlaying = false;

    const songs = [
        { title: "Song 1", src: "Thar-Love-Kataria.mp3" },
    ];

    function loadSong(index) {
        audioPlayer.src = songs[index].src;
        audioPlayer.play();
        playPauseBtn.textContent = "Pause";
        isPlaying = true;
    }

    function playPause() {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.textContent = "Play";
        } else {
            audioPlayer.play();
            playPauseBtn.textContent = "Pause";
        }
        isPlaying = !isPlaying;
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    }

    function updateSeekSlider() {
        seekSlider.value = audioPlayer.currentTime;
    }

    function updateSongList() {
        songList.innerHTML = "";
        songs.forEach((song, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = song.title;
            listItem.addEventListener("click", () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
            });
            songList.appendChild(listItem);
        });
    }

    audioPlayer.addEventListener("timeupdate", updateSeekSlider);
    audioPlayer.addEventListener("ended", nextSong);

    playPauseBtn.addEventListener("click", playPause);
    prevBtn.addEventListener("click", prevSong);
    nextBtn.addEventListener("click", nextSong);

    seekSlider.addEventListener("input", () => {
        audioPlayer.currentTime = seekSlider.value;
    });

    updateSongList();
});
