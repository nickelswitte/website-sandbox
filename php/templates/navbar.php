<!-- 
    This document will contain the navbar
-->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    
    <div class="container">
        <a class="navbar-brand" href="/">Sandbox</a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- list for links -->
            <ul class="navbar-nav mr-auto">

<!--
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
-->

            </ul>
            
            <!-- search sketches -->
            <form action="<?php echo $root . 'search'?>" class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search Sketches" aria-label="search" name="q">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>