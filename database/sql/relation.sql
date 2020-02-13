CREATE TABLE relSketchPath (
    -> sketchId int NOT NULL,       
    -> pathId int NOT NULL,         
    -> CONSTRAINT fk_sketch_id 
    -> FOREIGN KEY (sketchId) REFERENCES sketches (sketchId) ON DELETE CASCADE ON UPDATE RESTRICT, 
    -> CONSTRAINT fk_path_id
    -> FOREIGN KEY (pathId) REFERENCES paths (pathId) ON DELETE CASCADE ON UPDATE RESTRICT
    -> );


    SELECT name, paths.path FROM sketches INNER JOIN relSketchPath ON sketches.sketchId = relSketchPath.sketchId INNER JOIN paths ON relSketchPath.pathId = paths.pathId;

    SELECT sketches.sketchId, name, paths.pathId, path FROM sketches INNER JOIN relSketchPath ON sketches.sketchId = relSketchPath.sketchId INNER JOIN paths ON relSketchPath.pathId = paths.pathId ORDER BY timestamp;